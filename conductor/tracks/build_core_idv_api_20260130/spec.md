# Specification - Build the core IDV Web API

## Overview
Implement a FastAPI-based service to provide face verification capabilities using the DeepFace library. This service is intended to be the backend engine for an Identity Verification (IDV) system.

## Requirements
- **Endpoint**: `POST /verify`
- **Input**: Two images provided as Base64 encoded strings (Data URIs).
- **Processing**:
  - Decode Base64 images to OpenCV format.
  - Call `DeepFace.verify` with configurable model (default: VGG-Face).
  - Normalize the distance metric to a 0-100% confidence score.
- **Output**: JSON response with verification status and confidence score.
- **Privacy**: No images or embeddings stored on disk (ephemeral processing).
- **Deployment**: Must include configurations for Railway.com (e.g., Dockerfile or Nixpacks).

## Success Criteria
- API successfully accepts two images and returns a match result.
- Confidence score is correctly normalized.
- API is non-interactive and handles errors gracefully with JSON responses.
