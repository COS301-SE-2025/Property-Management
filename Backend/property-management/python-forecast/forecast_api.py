#!/usr/bin/env python3
import os
import joblib
from flask import Flask, request, jsonify
from datetime import datetime
import pandas as pd

app = Flask(__name__)
BASE_DIR = os.path.dirname(__file__)
MODELS_DIR = os.path.join(BASE_DIR, "models")


def find_model_path(item_uuid):
    for filename in os.listdir(MODELS_DIR):
        if filename.startswith(item_uuid + "__") and filename.endswith(".pkl"):
            return os.path.join(MODELS_DIR, filename)
    return None


@app.route("/forecast", methods=["POST"])
def forecast():
    data = request.get_json(force=True)
    item_uuid = data.get("item_uuid")
    months = int(data.get("months", 3))
    freq = data.get("freq", "D").upper()

    if not item_uuid:
        return jsonify({"error": "Missing item_uuid"}), 400

    model_path = find_model_path(item_uuid)
    if not model_path:
        return jsonify({"error": f"No model found for item_uuid {item_uuid}"}), 404

    payload = joblib.load(model_path)
    model = payload.get("model")
    item_name = payload.get("item_name")
    unit = payload.get("unit")

    if freq == "D":
        periods = months * 30
        freq_pd = "D"
    elif freq == "W":
        periods = months * 4
        freq_pd = "W"
    elif freq == "M":
        periods = months
        freq_pd = "M"
    else:
        periods = months * 30
        freq_pd = "D"

    future = model.make_future_dataframe(periods=periods, freq=freq_pd)
    forecast_df = model.predict(future)

    result = forecast_df[["ds", "yhat"]].tail(periods).copy()
    result["ds"] = result["ds"].dt.strftime("%Y-%m-%d")

    response = {
        "item_uuid": item_uuid,
        "item_name": item_name,
        "unit": unit,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "periods": periods,
        "forecast": result.to_dict(orient="records")
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)), debug=True)
