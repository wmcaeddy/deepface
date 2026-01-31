# Implementation Plan - Refine and Deploy React IDV Frontend

## Phase 1: Local Automation & Access [checkpoint: dfd31af]
- [x] Task: Create `scripts/start-dev.sh` to launch Backend and Frontend non-interactively. d8f938d
    - [x] Create script to check/install dependencies, start backend (bg), start frontend (bg), and wait.
    - [x] Ensure script prints the final access URL (http://localhost:5173).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Local Automation' (Protocol in workflow.md) dfd31af

## Phase 2: UX Refinements (Capture & Feedback)
- [x] Task: Enhance `SelfieCapture` component with visual guides. fc90454
    - [x] Add CSS overlay for "face oval" guide over the webcam feed.
    - [x] Implement a 3-second countdown timer before capture.
- [ ] Task: Update `ResultsDashboard` for clear visual feedback.
    - [ ] Style success/failure states with MUI colors/icons.
    - [ ] Map API error codes to user-friendly messages.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: UX Refinements' (Protocol in workflow.md)

## Phase 3: Railway Deployment Setup
- [ ] Task: Configure production build for Frontend.
    - [ ] Update `vite.config.ts` if needed for production builds.
    - [ ] Create/Update `Dockerfile` or `nixpacks.toml` to serve the React build (e.g., using Nginx or serving static files via FastAPI).
- [ ] Task: Create non-interactive deployment script.
    - [ ] Implement `scripts/deploy.sh` using Railway CLI to create/update the project and deploy without prompts.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Railway Deployment' (Protocol in workflow.md)
