# Step 1: Use an official Python image as the base
FROM python:3.9-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Install dependencies (make sure `requirements.txt` includes FastAPI and Uvicorn)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Step 4: Copy the FastAPI app code into the container
COPY . /app

# Step 5: Expose the FastAPI app port (default is 8000)
EXPOSE 8000

# Step 6: Start FastAPI with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
