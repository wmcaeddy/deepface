# Implementation Plan - Enhanced AI Selfie Capture

## Phase 1: Dependency Integration [checkpoint: ee1592a]
- [x] Task: Install AI detection dependencies. fac504a
    - [x] Run `npm install @mediapipe/face_detection @tensorflow/tfjs-core @tensorflow/tfjs-backend-webgl react-use-face-detection` in the `frontend` directory.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Dependencies' (Protocol in workflow.md) ee1592a

## Phase 2: AI Detection Logic
- [ ] Task: Integrate `useFaceDetection` hook into `SelfieCapture.tsx`.
    - [ ] Initialize the hook with the `webcamRef`.
    - [ ] Configure detection parameters (model selection, min confidence).
- [ ] Task: Implement Auto-Capture state machine.
    - [ ] Create logic to detect "stable" face presence.
    - [ ] Add a 1.5s countdown that triggers the existing `capture()` function.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: AI Logic' (Protocol in workflow.md)

## Phase 3: UI/UX Enhancements
- [ ] Task: Update the visual guide (Smart Oval).
    - [ ] Bind oval border color to the `detected` state (Gray -> Green).
    - [ ] Add a pulsing animation during the stability countdown.
- [ ] Task: Add real-time status messages.
    - [ ] Display "Face Detected" and "Hold Steady" prompts based on AI state.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: AI UI' (Protocol in workflow.md)
