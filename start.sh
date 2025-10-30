#!/bin/bash

# Start backend in background
cd backend1
echo "Starting backend..."
NODE_ENV=development SKIP_SEED=1 node index.js &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
cd Frontend1
echo "Starting frontend..."
PORT=5000 DANGEROUSLY_DISABLE_HOST_CHECK=true WDS_SOCKET_PORT=0 GENERATE_SOURCEMAP=false NODE_OPTIONS="--max-old-space-size=2048" npm start

# If frontend exits, kill backend
kill $BACKEND_PID 2>/dev/null
