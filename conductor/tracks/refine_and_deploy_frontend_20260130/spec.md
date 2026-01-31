# Specification - Refine and Deploy React IDV Frontend

## Overview
This track focuses on refining the existing React-based Identity Verification (IDV) frontend to ensure a professional, "suitable" user experience. It addresses functional gaps in camera capture, user guidance, and performance, while also providing a streamlined path for local access and production deployment to Railway.com.

## Functional Requirements
- **Camera & Capture (UX):**
    - Implement a "face oval" visual guide to help users position their faces correctly.
    - Add a countdown timer for selfie capture to improve image stability.
- **Visual Feedback & Results:**
    - Redesign the Results Dashboard to be more intuitive, using clear color-coded indicators (Green for Pass, Red for Fail).
    - Provide human-readable error messages for common failures (e.g., "No face detected," "Image too blurry").
- **User Instructions:**
    - Integrate instructional overlays or tooltips in the `ReferencePhotoCapture` and `SelfieCapture` steps.
- **Performance Optimization:**
    - Ensure Base64 image strings are handled efficiently to minimize latency during the `/verify` call.
- **Access & Deployment:**
    - **Local Access:** Create a non-interactive script (e.g., `start-dev.sh`) that launches both backend and frontend services in the background, outputting the access URL.
    - **Railway Deployment:** Create a non-interactive CLI command or script to trigger the deployment to Railway (using `railway` CLI or GitHub Actions config), requiring zero manual inputs during execution.

## Tech Stack (Aligned with Project)
- **Frontend:** React, Vite, Material UI, `react-webcam`.
- **Backend:** FastAPI (Python).
- **Deployment:** Railway.com.

## Acceptance Criteria
- A user can complete the IDV flow with a guided camera experience.
- The system provides clear, color-coded feedback for verification results.
- A single non-interactive command starts the development environment locally and prints the URL.
- The application is successfully deployed to Railway via a non-interactive command/pipeline and is accessible via a public URL.
