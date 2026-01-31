# Product Definition - DeepFace IDV System (QPayServer)

## Initial Concept
The goal is to build a web-based Identity Verification (IDV) system, similar to QPayServer, hosted on Railway.com. This system will leverage the DeepFace library to provide face matching between a reference ID photo and a live selfie, replacing commercial providers like GBG SmartCapture with an open-source alternative.

## Target Users
- **Developers & Integrators:** Software engineers looking for an open-source, self-hosted IDV solution.
- **Fintech & Security Apps:** Startups and projects requiring identity verification without high per-transaction costs.
- **Automated Systems:** CI/CD pipelines and automated deployment scripts that require non-interactive setup.

## Core Goals
- **Cost Efficiency:** Eliminate reliance on expensive commercial IDV APIs.
- **Privacy & Control:** Keep biometric data within a controlled environment (Railway.com infrastructure).
- **Automation First:** Prioritize non-interactive, CLI-driven commands for setup, deployment, and operation to minimize manual involvement.
- **API Compatibility:** Maintain an interface compatible with existing frontend implementations (e.g., React with `react-webcam`).

## Key Features
- **Face Verification:** High-accuracy comparison between a reference image (ID card) and a live selfie using DeepFace models (VGG-Face, Facenet, etc.).
- **Hybrid Backend:** A Node.js/TypeScript Express server for orchestration and a FastAPI Python service for heavy lifting with DeepFace.
- **React Frontend:** A responsive, Material UI-based web interface for capturing ID photos and live selfies.
- **AI-Assisted Capture:** Real-time browser-based face detection and auto-capture to ensure high-quality biometric inputs.
- **Non-Interactive CLI:** Robust command-line interface for managing the system without manual prompts.
- **Base64 Image Support:** Handling of data-URI images directly from frontend capture components.
- **Confidence Scoring:** Normalized matching scores to provide pass/fail results.

## Success Criteria
- Successful verification of a user's identity with a configurable confidence threshold.
- Response times under 2 seconds for the complete verification pipeline.
- Fully automated, non-interactive deployment to Railway.com.
