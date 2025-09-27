#!/bin/bash
set -e

echo "🚀 Setting up Python environment for forecasting..."

cd "$(dirname "$0")"

# Create venv if it doesn't exist
if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

pip install --upgrade pip setuptools wheel

pip install --upgrade --force-reinstall \
  pandas \
  prophet \
  psycopg2-binary \
  pyyaml \
  joblib \
  flask \
  fastapi \
  uvicorn

# Save dependencies
pip freeze > requirements.txt

echo "✅ Forecasting environment setup complete!"
echo "To activate later: source venv/bin/activate"
