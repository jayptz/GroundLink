# Dockerfile for FastAPI backend
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y build-essential libpq-dev && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY app ./app
COPY .env.example ./.env

# Expose port
EXPOSE 8000

# Run the app
# Serve Socket.IO ASGI app
CMD ["uvicorn","app.main:socketio_asgi","--host","0.0.0.0","--port","8000","--reload"] 