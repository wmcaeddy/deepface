# Specification - Aggressive Detection Bypass

## Overview
The current multi-stage detection fallback is still causing user friction with "Face detection failed" errors. This track implements an aggressive, automated bypass strategy: if a quick initial detection fails, the system will immediately proceed without enforcing face detection, relying on the similarity score to determine validity.

## Functional Requirements
- **Aggressive Bypass Logic (Automated):**
    1. Attempt a fast initial detection (`opencv`).
    2. If it fails, **immediately** retry with `enforce_detection=False` and `detector_backend='skip'`.
    3. Skip the slow `mtcnn` fallback entirely to minimize latency.
- **Non-Interactive Implementation:** All code modifications, test suite executions, and verification steps must be executable without manual user prompts.
- **UI/UX Updates:**
    - Update instructions to emphasize proper positioning for a good match.
    - Soften error messaging in the frontend if a match fails.

## Tech Stack (Aligned with Project)
- **Backend:** FastAPI, DeepFace (Python).
- **Frontend:** React, Material UI.

## Acceptance Criteria
- Users **never** see the "Face detection failed" error message.
- Results are always returned (Match or Mismatch).
- All build and test pipelines execute non-interactively.
