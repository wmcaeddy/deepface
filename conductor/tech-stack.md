# Technology Stack - DeepFace IDV System

## Core Languages & Runtimes
- **Python 3.9+**: Primary language for the DeepFace engine and FastAPI service.
- **Node.js (LTS)**: Runtime for the orchestration layer and main API server.
- **TypeScript**: Used for the Node.js layer to ensure type safety and maintainability.

## Frameworks & Libraries
- **DeepFace**: Core facial recognition and attribute analysis framework.
- **FastAPI (Python)**: High-performance framework for exposing DeepFace capabilities as a microservice.
- **Express.js (Node.js)**: Orchestration layer for managing requests, authentication, and integration with the IDV workflow.
- **TensorFlow / Keras (CPU-only)**: Underlying deep learning engines, specifically configured for CPU execution to ensure compatibility with standard hosting environments.

## Deployment & Infrastructure
- **Railway.com**: Primary hosting platform.
- **CPU-Optimized**: System is designed to run efficiently on standard CPU instances without requiring GPU acceleration.
- **Docker**: Containerization for consistent environments between development and production.

## Data & Storage (Ephemeral Focused)
- **MongoDB**: Used for session management and optional verification metadata (non-biometric).
- **In-Memory Cache (Redis/Node-Cache)**: For temporary storage of verification states during the polling/request lifecycle.
