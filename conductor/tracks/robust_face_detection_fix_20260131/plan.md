# Implementation Plan - Robust Face Detection Fix

## Phase 1: Robust Detection Strategy [checkpoint: 0eeb787]
- [x] Task: Implement detector fallback logic in `VerificationService`. 2b39db5
    - [x] Create a unit test `tests/unit/test_detection_fallback.py` that simulates a detection failure and expects a successful retry.
    - [x] Update `deepface/api/src/idv_service/service.py` to implement the `opencv` -> `mtcnn` -> `enforce_detection=False` chain.
    - [x] Add detailed logging for each fallback step.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Detection Strategy' (Protocol in workflow.md) 0eeb787

## Phase 2: Integration & Performance
- [x] Task: Verify end-to-end verification flow with difficult images. 5ac58dd
    - [x] Run automated integration tests `tests/integration/test_idv_api_integration.py`.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Integration' (Protocol in workflow.md)
