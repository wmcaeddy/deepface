# Implementation Plan - Aggressive Detection Bypass

## Phase 1: Backend Logic Update
- [x] Task: Simplify `VerificationService.verify` to aggressive bypass. 6ec1fa1
    - [x] Create a unit test `tests/unit/test_aggressive_bypass.py` that verifies the immediate skip on failure.
    - [x] Update `deepface/api/src/idv_service/service.py` to remove `mtcnn` and implement immediate `enforce_detection=False`.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Aggressive Bypass' (Protocol in workflow.md)

## Phase 2: Frontend UX Refinement
- [ ] Task: Update error messages and instructions in React.
    - [ ] Modify `frontend/src/App.tsx` to use softer error messages for mismatches.
    - [ ] Update `SelfieCapture.tsx` instructions to emphasize positioning.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UX Refinement' (Protocol in workflow.md)
