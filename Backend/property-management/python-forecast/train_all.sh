#!/bin/bash
set -e

echo "🔄 Activating virtual environment and training all models..."

source venv/bin/activate

python train_models.py

echo "✅ Training complete!"
