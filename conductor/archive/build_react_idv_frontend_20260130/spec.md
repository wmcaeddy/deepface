# Specification - Build React IDV Frontend

## Overview
Create a responsive React application that serves as the primary user interface for the IDV system. It must facilitate the capture or upload of a reference ID and a live selfie, then display verification results.

## Requirements
- **Framework**: React (using Vite for fast development).
- **UI Library**: Material UI (MUI) for a professional look and feel.
- **Components**:
  - **ID Capture**: Support both file upload and camera capture.
  - **Selfie Capture**: Use `react-webcam` for live face capture.
  - **Results Dashboard**: Display match status, confidence score, and visual indicators (success/failure).
- **API Integration**: Connect to the `/verify` endpoint of the FastAPI service.
- **UX**:
  - Step-by-step wizard for the verification process.
  - Real-time feedback during camera capture.
  - Responsive design for mobile and desktop.

## Success Criteria
- User can complete a full verification flow (upload ID -> capture selfie -> see results).
- UI adheres to Material Design principles.
- Frontend successfully communicates with the Python backend.
