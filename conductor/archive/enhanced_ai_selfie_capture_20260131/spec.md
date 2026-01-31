# Specification - Enhanced AI Selfie Capture

## Overview
This track upgrades the manual selfie capture process to an automated, AI-assisted experience. By integrating real-time face detection directly in the browser, we provide users with immediate feedback and ensure that the backend receives high-quality, well-positioned images, significantly reducing "Face detection failed" errors.

## Functional Requirements
- **Real-time Detection:** Integrate MediaPipe Face Detection to track face coordinates in the live webcam feed.
- **Dynamic Visual Feedback:**
    - The face oval guide will turn **Green** when a face is detected and correctly positioned.
    - Provide a "Hold Steady" status message when the capture is about to trigger.
- **Auto-Capture Logic:**
    - Implement a "Steady-State" timer: once a face is detected inside the guide, wait for 1.5 seconds of stability before automatically triggering the capture.
    - Play a subtle visual animation (e.g., pulsing green border) during the countdown.
- **Performance & Optimization:**
    - Use WebGL acceleration for detection to ensure smooth frame rates even on lower-end devices.
    - Only process detection frames locally; no data is sent to the server until the final capture.

## Tech Stack (Aligned with Project)
- **Engine:** `@mediapipe/face_detection` (via `react-use-face-detection`).
- **Framework:** React, Material UI.
- **Webcam:** `react-webcam`.

## Acceptance Criteria
- The face oval turns Green if and only if a face is detected in the frame.
- The system automatically captures the selfie without requiring a button click.
- The resulting capture is compatible with the existing DeepFace `/verify` API.
- All implementation and build steps are executable via non-interactive commands.
