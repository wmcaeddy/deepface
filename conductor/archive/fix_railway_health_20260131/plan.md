# Implementation Plan - Fix Railway Health Check Failure

## Phase 1: Configuration Fixes
- [x] Task: Update `Dockerfile.idv` system dependencies.
    - [x] Add `libgl1`.
- [x] Task: Update `Dockerfile.idv` CMD to use shell form and `$PORT`.
    - [x] Change CMD to `CMD uvicorn deepface.api.src.idv_service.app:app --host 0.0.0.0 --port ${PORT:-8080}`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Configuration Fixes' (Protocol in workflow.md) 5c0c99f
