#!/bin/bash

# Ensure script is run from project root
cd "$(dirname "$0")/.."

echo "Starting DeepFace IDV Development Environment..."

# Function to kill background processes on exit
cleanup() {
    echo "Stopping services..."
    kill $(jobs -p) 2>/dev/null
}
trap cleanup EXIT

# 1. Start Backend
echo "Starting FastAPI Backend on port 8080..."
# Check for venv and activate if it exists
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Install backend dependencies if needed (quietly)
# pip install -r deepface/api/src/idv_service/requirements.txt > /dev/null 2>&1

uvicorn deepface.api.src.idv_service.app:app --host 0.0.0.0 --port 8080 --reload > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID). Logs: backend.log"

# 2. Start Frontend
echo "Starting React Frontend on port 5173..."
cd frontend
# npm install > /dev/null 2>&1 # Optional: auto-install
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..
echo "Frontend started (PID: $FRONTEND_PID). Logs: frontend.log"

# 3. Wait a moment for services to initialize
sleep 5

echo "---------------------------------------------------"
echo "IDV System is running!"
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo "---------------------------------------------------"
echo "Press Ctrl+C to stop."

# Wait for background processes
wait
