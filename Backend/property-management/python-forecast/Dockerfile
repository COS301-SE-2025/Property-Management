# Use Python 3.11 slim image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application files
COPY forecast_api.py .
COPY train_models.py .

# Create models directory
RUN mkdir -p models

# Expose the port FastAPI runs on
EXPOSE 5000

# Command to run the application
CMD ["uvicorn", "forecast_api:app", "--host", "0.0.0.0", "--port", "5000"]