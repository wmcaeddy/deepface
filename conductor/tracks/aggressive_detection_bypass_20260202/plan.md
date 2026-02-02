# Implementation Plan - Aggressive Detection Bypass

## Phase 1: Backend Logic Update [checkpoint: d40b8d7]
- [x] Task: Simplify `VerificationService.verify` to aggressive bypass. 6ec1fa1
    - [x] Create a unit test `tests/unit/test_aggressive_bypass.py` that verifies the immediate skip on failure.
    - [x] Update `deepface/api/src/idv_service/service.py` to remove `mtcnn` and implement immediate `enforce_detection=False`.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Aggressive Bypass' (Protocol in workflow.md) d40b8d7

## Phase 2: Frontend UX Refinement
- [x] Task: Update error messages and instructions in React. 0cec74c
    - [x] Modify `frontend/src/App.tsx` to use softer error messages for mismatches.
    - [x] Update `SelfieCapture.tsx` instructions to emphasize positioning.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UX Refinement' (Protocol in workflow.md)
