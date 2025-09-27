export interface ForecastItem {
  item_uuid: string;
  item_name: string;
  unit: string;
  generated_at: string;
  periods: number;
  forecast: Array<{
    ds: string;
    yhat: number;
  }>;
  total_forecasted: number;
  current_stock: number;
  shortage: number;
  alert: string;
}

export interface ForecastResponse {
  building_uuid: string;
  months: number;
  freq: string;
  items_forecasts: ForecastItem[];
  total_forecasted_usage: number;
  total_shortage: number;
  alert: string;
}