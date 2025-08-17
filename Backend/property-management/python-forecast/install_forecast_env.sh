#!/bin/bash
set -e

echo "🚀 Setting up Python environment for forecasting..."

python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip

# Install packages (binary psycopg2 to avoid build issues)
pip install pandas prophet psycopg2-binary pyyaml joblib

pip freeze > requirements.txt

echo "✅ Forecasting environment setup complete!"
echo "To activate later: source venv/bin/activate"
