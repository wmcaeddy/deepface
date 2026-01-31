# Specification - Fix Railway Health Check Failure

## Overview
The deployed service fails health checks on Railway. Suspected causes:
1. Missing system dependencies for OpenCV (`libgl1`).
2. Incorrect port binding (CMD hardcoded to 8080 vs Railway's $PORT).

## Requirements
- Ensure all system dependencies are installed.
- Ensure the application binds to the port specified by the `PORT` environment variable.

## Acceptance Criteria
- Railway deployment succeeds and health check passes.
