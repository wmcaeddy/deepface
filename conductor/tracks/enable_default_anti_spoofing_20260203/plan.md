# Implementation Plan - Enable Default Anti-Spoofing

This plan details the steps to change the default value of `anti_spoofing` from `False` to `True` across the DeepFace library and update documentation accordingly, following a TDD and automation-first approach.

## Phase 1: Verification of Current Behavior (Baseline) [checkpoint: 073bb17]
- [x] Task: Create a baseline test to confirm `anti_spoofing` currently defaults to `False`. (516bc4c)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Verification of Current Behavior (Baseline)' (Protocol in workflow.md)

## Phase 2: Implementation of Default Changes (Core Library)
- [ ] Task: Update `DeepFace.py` function signatures.
    - [ ] Modify `verify`, `analyze`, `extract_faces`, `find`, and `stream` in `deepface/DeepFace.py` to set `anti_spoofing: bool = True`.
- [ ] Task: Update underlying module default parameters.
    - [ ] Update `deepface/modules/verification.py`.
    - [ ] Update `deepface/modules/detection.py`.
    - [ ] Update `deepface/modules/recognition.py`.
    - [ ] Update `deepface/modules/representation.py`.
    - [ ] Update `deepface/modules/demography.py`.
    - [ ] Update `deepface/modules/datastore.py`.
    - [ ] Update `deepface/modules/streaming.py`.
- [ ] Task: Write TDD tests for new default behavior.
    - [ ] Create `tests/unit/test_default_anti_spoofing_enabled.py`.
    - [ ] Implement tests calling `DeepFace.extract_faces` and `DeepFace.verify` without the `anti_spoofing` argument.
    - [ ] Assert that the result DOES contain `is_real` and `antispoof_score`.
    - [ ] Run tests with `CI=true pytest tests/unit/test_default_anti_spoofing_enabled.py` and confirm they pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Implementation of Default Changes (Core Library)' (Protocol in workflow.md)

## Phase 3: Documentation Updates
- [ ] Task: Update Docstrings in `DeepFace.py`.
    - [ ] Revise all parameter descriptions for `anti_spoofing` to state `(default is True)`.
- [ ] Task: Update `README.md`.
    - [ ] Find the "Face Anti Spoofing" section and update the text to reflect the new default behavior.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Documentation Updates' (Protocol in workflow.md)

## Phase 4: Final Validation and Quality Gates
- [ ] Task: Run full test suite.
    - [ ] Execute `CI=true pytest` to ensure no regressions in existing tests that might depend on the previous default.
- [ ] Task: Verify Code Coverage.
    - [ ] Run coverage report and ensure new changes are covered.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Validation and Quality Gates' (Protocol in workflow.md)
