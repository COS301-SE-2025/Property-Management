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
        
        if freq in ["M", "MS"]:
            df_resampled = df.resample("M", on='ds').sum().reset_index()
        elif freq in ["Y", "YE", "YS"]:
            df_resampled = df.resample("YE", on="ds").sum().reset_index()
        else:
            raise HTTPException(status_code=400, detail="Invalid frequency")
        
        if len(df_resampled) < 2:
            if freq in ["Y", "YE", "YS"]:
                df_resampled = df.set_index("ds").resample("M").sum().reset_index()
                df_resampled = df_resampled.set_index("ds").resample("YE").sum().reset_index()

                if len(df_resampled) < 2:
                    raise HTTPException(status_code=400, detail="Not enough data for yearly forecasting")
                else:
                    raise HTTPException(status_code=400, detail=f"Not enough data for yearly forecasting. {len(df_resampled)} period(s) avaialble")
                
        model = Prophet()
        model.fit(df_resampled)

        future = model.make_future_dataframe(periods=periods, freq=freq if freq != "Y" else "YE")
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