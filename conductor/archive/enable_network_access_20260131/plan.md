# Implementation Plan - Enable Local Network Access

## Phase 1: Configuration & Exposure
- [x] Task: Set up Vite proxy for the backend. 6c061c0
    - [x] Update `frontend/vite.config.ts` to proxy `/verify` to `http://localhost:8080`.
- [x] Task: Update Frontend API to use relative paths. 6c061c0
    - [x] Modify `frontend/src/api.ts` to remove hardcoded `baseURL`.
- [x] Task: Update `scripts/start-dev.sh` for network exposure. 6c061c0
    - [x] Add `--host` flag to `npm run dev`.
    - [x] Implement local IP detection and print the network URL.
- [x] Task: Conductor - User Manual Verification 'Phase 1: Network Access' (Protocol in workflow.md) 359edda
