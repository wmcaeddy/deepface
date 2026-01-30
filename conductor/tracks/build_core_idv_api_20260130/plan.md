# Implementation Plan - Build the core IDV Web API

## Phase 1: Foundation & Environment
- [ ] Task: Set up FastAPI project structure in a new directory (e.g., `deepface/api/src/idv_service`).
- [ ] Task: Create `requirements.txt` specific to the API dependencies (FastAPI, uvicorn, python-multipart).
- [ ] Task: Implement basic FastAPI application with health check endpoint.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Environment' (Protocol in workflow.md)

## Phase 2: Core Verification Logic
- [ ] Task: Implement image decoding utility for Base64 Data URIs.
- [ ] Task: Create verification service layer wrapping `DeepFace.verify`.
- [ ] Task: Implement confidence score normalization logic.
- [ ] Task: Create `POST /verify` endpoint.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Core Verification Logic' (Protocol in workflow.md)

## Phase 3: Testing & Integration
- [ ] Task: Write unit tests for image decoding.
- [ ] Task: Write integration tests for the `POST /verify` endpoint using sample images.
- [ ] Task: Verify non-interactive error handling for invalid inputs.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Testing & Integration' (Protocol in workflow.md)

## Phase 4: Deployment Readiness
- [ ] Task: Create/Update Dockerfile to support the new FastAPI service.
- [ ] Task: Add Railway.com specific configurations (e.g., `railway.json` or environment variable templates).
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Deployment Readiness' (Protocol in workflow.md)
