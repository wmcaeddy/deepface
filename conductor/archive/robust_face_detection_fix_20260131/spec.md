# Specification - Robust Face Detection Fix

## Overview
The current IDV system relies on the default OpenCV detector, which is strict but often fails in real-world lighting or angles. This track implements an automated, multi-stage detection fallback strategy to ensure high success rates while maintaining security.

## Functional Requirements
- **Automated Fallback Chain:** Modify `VerificationService.verify` to automatically attempt verification using a sequence of detectors if the primary one fails:
    1. **OpenCV (Fastest):** Initial attempt for speed.
    2. **MTCNN (Robust):** Secondary attempt if OpenCV fails to find a face.
    3. **Enforcement Bypass:** Final attempt with `enforce_detection=False` if all detectors fail, allowing the similarity score to make the final decision.
- **Non-Interactive Implementation:** Ensure all code changes, test executions, and deployment steps are fully automated and require no manual inputs.
- **Enhanced Logging:** Log each stage of the fallback chain to provide visibility into which images are triggering failures.

## Tech Stack (Aligned with Project)
- **Backend:** FastAPI, DeepFace (Python).
- **Detectors:** OpenCV, MTCNN.

## Acceptance Criteria
- Users experience significantly fewer "Face detection failed" errors.
- System automatically resolves detection issues without user intervention.
- All build and test pipelines execute non-interactively.
