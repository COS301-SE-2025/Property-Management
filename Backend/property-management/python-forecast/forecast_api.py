#!/usr/bin/env python3
import os
import joblib
import pandas as pd
import numpy as np
import psycopg2
from prophet import Prophet
from datetime import datetime
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List, Dict
import yaml
import re
import cloudscraper
from bs4 import BeautifulSoup
import json
from budget_prediction import BudgetPrediction

BASE_DIR = os.path.dirname(__file__)
MODELS_DIR = os.path.join(BASE_DIR, "models")

CONFIG_PATHS = [
    "/app/application.yml",  
    "../src/main/resources/application.yml",  
    "application.yml" 
]

app = FastAPI(title="Forecast API", version="1.2.0")

origins = [
    "http://localhost:8080",
    "http://localhost:4200",
    "http://localhost:8100",
    "https://localhost",

    "https://property-management.live",
    "https://www.property-management.live",
    "https://app.property-management.live",
    "https://staging.d19cit456z7grf.amplifyapp.com",
    "capacitor://localhost"  
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

class ForecastRequest(BaseModel):
    item_uuid: str
    months: Optional[int] = 3
    freq: Optional[str] = "D"  # D = daily, W = weekly, M = monthly

class TrainRequest(BaseModel):
    item_uuid: str

def resolve_placeholder(value):
    if isinstance(value, str):
        match = re.match(r"\$\{(.+?):(.+?)\}", value)
        if match:
            env_var, default = match.groups()
            return os.getenv(env_var, default)
    return value

def load_config():
    for config_path in CONFIG_PATHS:
        if os.path.exists(config_path):
            with open(config_path, "r") as f:
                return yaml.safe_load(f)
            
    print("⚠️ Warning: No configuration file found. Please ensure environment variables are set.")
    return None

spring_config = load_config()

if spring_config and "spring" in spring_config:
    db_config = spring_config["spring"]["datasource"]
    raw_url = resolve_placeholder(db_config["url"])
    DB_USER = resolve_placeholder(db_config["username"])
    DB_PASS = resolve_placeholder(db_config["password"])
    DB_NAME = raw_url.split("/")[-1]
    DB_HOST = raw_url.split("//")[-1].split(":")[0]
    DB_PORT = raw_url.split(":")[-1].split("/")[0]
else:
    spring_url = os.getenv("SPRING_DATASOURCE_URL")
    DB_USER = os.getenv("SPRING_DATASOURCE_USERNAME")
    DB_PASS = os.getenv("SPRING_DATASOURCE_PASSWORD")
    
    if spring_url:
        clean_url = spring_url.replace("jdbc:postgresql://", "")
        DB_HOST = clean_url.split(":")[0]
        port_and_db = clean_url.split(":")[1]
        DB_PORT = port_and_db.split("/")[0]
        DB_NAME = port_and_db.split("/")[1]
    else:
        raise EnvironmentError("Database configuration not found in environment variables.")
        
os.makedirs(MODELS_DIR, exist_ok=True)

def get_connection():
    return psycopg2.connect(
        dbname=DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT
    )

def train_item(item_uuid: str) -> str:
    conn = get_connection()
    query = """
    SELECT
        ii.item_uuid,
        ii.name AS item_name,
        ii.unit,
        iu.approval_date,
        SUM(iu.quantity_used) AS total_used
    FROM inventoryusage iu
    JOIN inventoryitem ii ON iu.item_uuid = ii.item_uuid
    WHERE iu.approval_date IS NOT NULL
      AND ii.item_uuid = %s
    GROUP BY ii.item_uuid, ii.name, ii.unit, iu.approval_date
    ORDER BY ii.item_uuid, iu.approval_date;
    """
    df = pd.read_sql(query, conn, params=(item_uuid,))
    conn.close()

    if df.empty:
        raise HTTPException(status_code=400, detail=f"No approved data found for item {item_uuid}")

    item_name = df["item_name"].iloc[0]
    unit = df["unit"].iloc[0]

    ts_data = df.rename(columns={"approval_date": "ds", "total_used": "y"})
    ts_data = ts_data[["ds", "y"]]

    if len(ts_data) < 2:
        print(f"⚠️ Insufficient data for training item {item_uuid}: only {len(ts_data)} row(s). Skipping fit.")
        return f"skipped_{item_uuid}"

    model = Prophet()
    model.fit(ts_data)

    safe_name = item_name.replace(" ", "_").replace("/", "_")
    model_path = os.path.join(MODELS_DIR, f"{item_uuid}__{safe_name}.pkl")
    joblib.dump({
        "model": model,
        "item_name": item_name,
        "unit": unit,
        "trained_at": datetime.utcnow().isoformat() + "Z"
    }, model_path)

    return model_path

def train_all() -> int:
    conn = get_connection()
    query = """
    SELECT
        ii.item_uuid,
        ii.name AS item_name,
        ii.unit,
        iu.approval_date,
        SUM(iu.quantity_used) AS total_used
    FROM inventoryusage iu
    JOIN inventoryitem ii ON iu.item_uuid = ii.item_uuid
    WHERE iu.approval_date IS NOT NULL
    GROUP BY ii.item_uuid, ii.name, ii.unit, iu.approval_date
    ORDER BY ii.item_uuid, iu.approval_date;
    """
    df = pd.read_sql(query, conn)
    conn.close()

    if df.empty:
        return 0

    trained_count = 0
    for item_uuid, group in df.groupby("item_uuid"):
        item_name = group["item_name"].iloc[0]
        unit = group["unit"].iloc[0]

        ts_data = group.rename(columns={"approval_date": "ds", "total_used": "y"})
        ts_data = ts_data[["ds", "y"]]

        if len(ts_data) < 2:
            print(f"⚠️ Insufficient data for training item {item_uuid}: only {len(ts_data)} row(s). Skipping fit.")
            continue

        model = Prophet()
        model.fit(ts_data)

        safe_name = item_name.replace(" ", "_").replace("/", "_")
        model_path = os.path.join(MODELS_DIR, f"{item_uuid}__{safe_name}.pkl")
        joblib.dump({
            "model": model,
            "item_name": item_name,
            "unit": unit,
            "trained_at": datetime.utcnow().isoformat() + "Z"
        }, model_path)

        trained_count += 1

    return trained_count

def find_model_path(item_uuid: str) -> Optional[str]:
    for filename in os.listdir(MODELS_DIR):
        if filename.startswith(item_uuid + "__") and filename.endswith(".pkl"):
            return os.path.join(MODELS_DIR, filename)
    return None

@app.get("/debug-data/{item_uuid}")
def debug_data(item_uuid: str):
    conn = get_connection()
    query = """
    SELECT
        ii.item_uuid,
        ii.name AS item_name,
        ii.unit,
        iu.approval_date,
        SUM(iu.quantity_used) AS total_used
    FROM inventoryusage iu
    JOIN inventoryitem ii ON iu.item_uuid = ii.item_uuid
    WHERE iu.approval_date IS NOT NULL
      AND ii.item_uuid = %s
    GROUP BY ii.item_uuid, ii.name, ii.unit, iu.approval_date
    ORDER BY ii.item_uuid, iu.approval_date;
    """
    df = pd.read_sql(query, conn, params=(item_uuid,))
    conn.close()
    return {"data": df.to_dict(orient="records"), "empty": df.empty}

def list_models() -> List[Dict]:
    models = []
    for filename in os.listdir(MODELS_DIR):
        if filename.endswith(".pkl"):
            try:
                payload = joblib.load(os.path.join(MODELS_DIR, filename))
                models.append({
                    "item_uuid": filename.split("__")[0],
                    "item_name": payload.get("item_name"),
                    "unit": payload.get("unit"),
                    "trained_at": payload.get("trained_at", "unknown"),
                    "file": filename
                })
            except Exception:
                continue
    return models

@app.post("/train-item")
def train_item_route(request: TrainRequest):
    path = train_item(request.item_uuid)
    return {"status": "success", "model_path": path}

@app.post("/train")
def train_all_route():
    count = train_all()
    return {"status": "success", "trained_models": count}

@app.post("/forecast")
def forecast(request: ForecastRequest):
    item_uuid = request.item_uuid
    months = request.months
    freq = request.freq.upper()

    model_path = find_model_path(item_uuid)
    if not model_path:
        raise HTTPException(status_code=404, detail=f"No model found for item_uuid {item_uuid}")

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
    elif freq == "Y":
        periods = months
        freq_pd = "Y"
    else:
        periods = months * 30
        freq_pd = "D"

    future = model.make_future_dataframe(periods=periods, freq=freq_pd)
    forecast_df = model.predict(future)

    result = forecast_df[["ds", "yhat"]].tail(periods).copy()
    result["yhat"] = result["yhat"].round().clip(lower=0).astype(int)  
    result["ds"] = result["ds"].dt.strftime("%Y-%m-%d")
    
    total_forecasted = int(result["yhat"].sum())
    
    conn = get_connection()
    stock_query = """
    SELECT quantity_in_stock FROM inventoryitem WHERE item_uuid = %s;
    """
    stock_df = pd.read_sql(stock_query, conn, params=(item_uuid,))
    conn.close()
    current_stock = int(stock_df["quantity_in_stock"].iloc[0]) if not stock_df.empty else 0

    shortage = max(0, total_forecasted - current_stock)
    alert_message = f"Forecasted usage: {total_forecasted} units. Current stock: {current_stock}. " \
                    f"{'Order at least ' + str(shortage) + ' more.' if shortage > 0 else 'Sufficient stock.'}"
                    
    return {
        "item_uuid": item_uuid,
        "item_name": item_name,
        "unit": unit,
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "periods": periods,
        "forecast": result.to_dict(orient="records"),
        "total_forecasted": total_forecasted,  
        "current_stock": current_stock,        
        "shortage": shortage,                  
        "alert": alert_message                 
    }

@app.get("/models")
def get_models():
    models = list_models()
    if not models:
        raise HTTPException(status_code=404, detail="No trained models found")
    return {"models": models}

@app.get("/health")
def health_check():
    try:
        conn = get_connection()
        conn.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "database": "disconnected", "error": str(e)}

@app.get("/")
def root():
    return {"message": "Forecast API is running 🚀"}

@app.post("/anomaly")
async def anomaly_dectition(request: Request):
    data = await request.json()
    product_title = data.get("title")
    product_price = data.get("price")

    if not all([product_title, product_price]):
        raise HTTPException(status_code=400, detail="Missing required fields")
    
    try:
        product_price = float(product_price)
    except ValueError:
        raise HTTPException(status_code=400, detail="Price must be a valid number")

    scraper = cloudscraper.create_scraper()
    url = f"https://www.pricecheck.co.za/search?search={product_title}"

    try:
        res = scraper.get(url)
        res.raise_for_status()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")
        
    soup = BeautifulSoup(res.text, "html.parser")
    scripts = soup.find_all("script", {"type": "application/ld+json"})
    
    prices = []
    for s in scripts:
        try:
            data = json.loads(s.string)
            if data.get("@type") == "CollectionPage":
                products = data["mainEntity"]["itemListElement"]
                for p in products:
                    if "offers" in p and "price" in p["offers"]:
                        price = float(p["offers"]["price"])
                        prices.append(price)
        except(json.JSONDecodeError, KeyError, ValueError):
            continue

    if len(prices) < 3:
        return {
            "message": "Insufficient data for anomaly detection",
            "timestamp": datetime.now()
        }
    
    mean_price = float(np.mean(prices))
    std_price = float(np.std(prices))
    Q1 = np.percentile(prices, 25)
    Q3 = np.percentile(prices, 75)
    IQR = Q3 - Q1

    min_price = Q1 - (1.5 * IQR)
    max_price = Q3 + (1.5 * IQR)

    if min_price <= 0:
        adjusted_min = 0.01
        is_anomaly = bool(product_price < adjusted_min or product_price > max_price)
        returned_min = adjusted_min
    else:
        is_anomaly = bool(product_price < min_price or product_price > max_price)
        returned_min = min_price

    return {
        "message": "Inventory anomaly detected" if is_anomaly else "Item normal",
        "timestamp": datetime.now().isoformat(),
        "data": {
            "title": product_title,
            "price": product_price,
        },
        "stats": {
            "mean_price": mean_price,
            "std_price": std_price,
            "min_threshold": returned_min,
            "max_threshold": max_price,
            "samples_count": len(prices)
        }
    }

class BudgetPredictionRequest(BaseModel):
    freq: Optional[str] = "M"
    periods: Optional[int] = 12
    budget_type: Optional[str] = "totalBudget"

@app.post("/budget-prediction/body-corporate/{bodyCorporateId}")
def budget_prediction_overall(bodyCorporateId: str, request: BudgetPredictionRequest):
    conn = get_connection()

    # Get buildings in body corp
    buildings_bc = """
        SELECT building_uuid FROM building WHERE coporate_uuid = %s;
    """
    buildingIds = pd.read_sql(buildings_bc, conn, params=(bodyCorporateId,))["building_uuid"]

    budgets = []
    for i in buildingIds:
        budget_query = """
                    SELECT * FROM budget WHERE building_uuid_fk = %s;
                """
        budget = pd.read_sql(budget_query, conn, params=((i,)))
        budgets.append(budget)
    conn.close()

    if not budgets:
        raise HTTPException(status_code=404, detail="No budgets found for this body corporate")
    
    budgets_df = pd.concat(budgets, ignore_index=True)

    b = BudgetPrediction()
    return b.predict_budget(budgets_df, request.freq, request.periods, request.budget_type)

@app.post("/budget-prediction/building/{buildingUuid}")
def budget_prediciton_building(buildingUuid: str, request: BudgetPredictionRequest):
    conn = get_connection()
    budget_building = """
    SELECT * FROM budget WHERE building_uuid_fk = %s;
    """
    budget_df = pd.read_sql(budget_building, conn, params = (buildingUuid,))
    conn.close()

    b = BudgetPrediction()
    return b.predict_budget(budget_df, request.freq, request.periods, request.budget_type)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)