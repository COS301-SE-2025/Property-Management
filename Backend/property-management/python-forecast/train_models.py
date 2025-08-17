#!/usr/bin/env python3

import os
import re
import joblib
import pandas as pd
import psycopg2
from prophet import Prophet
from datetime import datetime
import yaml

CONFIG_PATH = "../src/main/resources/application.yml"

def resolve_placeholder(value):
    if isinstance(value, str):
        match = re.match(r"\$\{(.+?):(.+?)\}", value)
        if match:
            env_var, default = match.groups()
            return os.getenv(env_var, default)
    return value

with open(CONFIG_PATH, "r") as f:
    spring_config = yaml.safe_load(f)

db_config = spring_config["spring"]["datasource"]

raw_url = resolve_placeholder(db_config["url"])
DB_USER = resolve_placeholder(db_config["username"])
DB_PASS = resolve_placeholder(db_config["password"])

DB_NAME = raw_url.split("/")[-1]
DB_HOST = raw_url.split("//")[-1].split(":")[0]
DB_PORT = raw_url.split(":")[-1].split("/")[0]

os.makedirs("models", exist_ok=True)

conn = psycopg2.connect(
    dbname=DB_NAME,
    user=DB_USER,
    password=DB_PASS,
    host=DB_HOST,
    port=DB_PORT
)

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

for item_uuid, group in df.groupby("item_uuid"):
    item_name = group["item_name"].iloc[0]
    unit = group["unit"].iloc[0]

    ts_data = group.rename(columns={"approval_date": "ds", "total_used": "y"})
    ts_data = ts_data[["ds", "y"]]

    model = Prophet()
    model.fit(ts_data)

    safe_name = item_name.replace(" ", "_").replace("/", "_")
    model_path = f"models/{item_uuid}__{safe_name}.pkl"
    joblib.dump({
        "model": model,
        "item_name": item_name,
        "unit": unit
    }, model_path)

    print(f"✅ Trained & saved model for {item_name} ({unit}) → {model_path}")
