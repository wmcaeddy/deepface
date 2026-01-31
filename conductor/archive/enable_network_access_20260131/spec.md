# Specification - Enable Local Network Access

## Overview
Currently, the application is designed for local development on a single machine. To allow other devices on the same network to access it, we need to:
1. Expose the development servers (Vite and FastAPI) to the network.
2. Ensure the frontend can reach the backend using the server machine's IP.
3. Provide instructions/scripts to find the local IP and access the app.

## Requirements
- **Frontend Expose:** Run Vite with the `--host` flag.
- **API Proxying:** Configure Vite to proxy `/verify` requests to the local backend. This ensures that browsers on other devices don't try to call `localhost:8080`.
- **Dynamic URL:** Remove hardcoded `localhost:8080` from `frontend/src/api.ts`.
- **User Guidance:** Update `start-dev.sh` to print the network-accessible URLs (e.g., `http://192.168.x.x:5173`).

## Acceptance Criteria
- A device on the same network can access the UI via the server's IP.
- The UI can successfully perform verification (reaching the backend via the server's IP).
- The `start-dev.sh` script clearly outputs the network URL.
