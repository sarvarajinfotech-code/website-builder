#!/bin/bash
set -e

echo "⏳ Waiting for MySQL to be ready..."

until mysqladmin ping -h"mysql" --silent; do
  echo "MySQL not ready, waiting..."
  sleep 2
done

echo "✅ MySQL is ready. Starting backend..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000
