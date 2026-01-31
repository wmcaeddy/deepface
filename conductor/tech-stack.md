# Technology Stack - DeepFace IDV System

## Core Languages & Runtimes
- **Python 3.9+**: Primary language for the DeepFace engine and FastAPI service.
- **Node.js (LTS)**: Runtime for the orchestration layer and main API server.
- **TypeScript**: Used for the Node.js layer to ensure type safety and maintainability.
- **React (TypeScript)**: Framework for the responsive web frontend.

- **Vite**: Build tool and development server for the React frontend.
- **Material UI (MUI)**: Component library for the frontend UI.
- **react-webcam**: Library for live camera capture in the browser.
- **MediaPipe Face Detection**: Real-time browser-based AI engine for face tracking.
- **react-use-face-detection**: React hook for integrating AI detection into the webcam flow.

## Deployment & Infrastructure
- **Railway.com**: Primary hosting platform.
- **CPU-Optimized**: System is designed to run efficiently on standard CPU instances without requiring GPU acceleration.
- **Docker**: Containerization for consistent environments between development and production.

## Data & Storage (Ephemeral Focused)
- **MongoDB**: Used for session management and optional verification metadata (non-biometric).
- **In-Memory Cache (Redis/Node-Cache)**: For temporary storage of verification states during the polling/request lifecycle.
