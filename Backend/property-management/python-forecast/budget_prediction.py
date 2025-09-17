from prophet import Prophet
import pandas as pd
from fastapi import HTTPException
from datetime import datetime

class BudgetPrediction:
    def predict_budget(self, data: pd.DataFrame, freq: str = "M", periods : int = 12, budget_type: str = "totalBudget"):
        
        df = data.rename(columns = {
            "approval_date": "ds",
            budget_type: "y"
        })[["ds", "y"]]

        df["ds"] = pd.to_datetime(df["ds"], errors="coerce")

        if df.empty or len(df) < 2:
            raise HTTPException(status_code=400, detail=f"Not enough data for {budget_type} forecasting")
        
        if freq == "M":
            df = df.resample("M", on='ds').sum().reset_index()
        elif freq == "Y":
            df = df.resample("Y", on="ds").sum().reset_index()
        else:
            raise HTTPException(status_code=400, detail="Invalid frequency")
        
        model = Prophet()
        model.fit(df)

        future = model.make_future_dataframe(periods=periods, freq=freq)
        forecast_df = model.predict(future)

        result = forecast_df[["ds", "yhat"]].tail(periods).copy()
        result["yhat"] = result["yhat"].round(2)
        result["ds"] = result["ds"].dt.strftime("%Y-%m-%d")

        return {
            "budget_type": budget_type,
            "freq": freq,
            "timestamp": datetime.now().isoformat(),
            "prediction": result.to_dict(orient="records"),
            "total": float(result["yhat"].sum())
        }