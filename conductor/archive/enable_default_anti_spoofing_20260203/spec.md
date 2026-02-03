# Specification - Enable Default Anti-Spoofing (Automation-First)

## Overview
This track enhances the security of the DeepFace library by enabling anti-spoofing analysis by default across all relevant core functions. The implementation and verification must prioritize non-interactive, automated processes.

## Functional Requirements
- **Core Library Update:** Change the default value of the `anti_spoofing` parameter from `False` to `True` in the following `DeepFace.py` functions:
    - `verify`
    - `analyze`
    - `extract_faces`
    - `find`
    - `stream`
- **Module Consistency:** Ensure that underlying modules (e.g., `modules/verification.py`, `modules/detection.py`, etc.) are updated if they rely on their own default parameter values for `anti_spoofing`.
- **Documentation:** Update all function docstrings in `DeepFace.py` and the main `README.md` to state that `anti_spoofing` is enabled by default.

## Non-Functional Requirements
- **Automation First:** All implementation tasks, test executions, and verification steps MUST be performed using non-interactive CLI commands (e.g., using `CI=true` or silent flags) to avoid manual prompts or user involvement.
- **Performance:** Acknowledge that enabling anti-spoofing by default adds a computational step (FasNet model execution).

## Acceptance Criteria
- [ ] `DeepFace.verify` enables anti-spoofing by default.
- [ ] `DeepFace.extract_faces` enables anti-spoofing by default.
- [ ] `DeepFace.analyze` enables anti-spoofing by default.
- [ ] `DeepFace.stream` enables anti-spoofing by default.
- [ ] `README.md` and docstrings correctly describe the new default behavior.
- [ ] Automated unit tests confirm that `is_real` and `antispoof_score` keys are present in results by default without manual intervention.

## Out of Scope
- Exposing this toggle to the `idv_service` or Core API.
- Adding environment variable overrides.
