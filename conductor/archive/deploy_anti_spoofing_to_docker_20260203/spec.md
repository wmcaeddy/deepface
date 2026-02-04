# Specification - Deploy Anti-Spoofing to Docker

## Overview
This track ensures that the newly enabled default anti-spoofing behavior is functional within the Docker environment. This requires updating dependency files to include PyTorch and verifying the Docker build process.

## Functional Requirements
- **Dependency Management:** Add pinned, CPU-optimized versions of `torch` and `torchvision` to `requirements_local`.
- **Docker Verification:** Successfully build a local Docker image using `Dockerfile.idv` to ensure the environment is ready for deployment.

## Non-Functional Requirements
- **Automation First:** All build and verification steps MUST be performed using non-interactive CLI commands.
- **Image Optimization:** Use CPU-only versions of PyTorch to minimize the final Docker image size.

## Acceptance Criteria
- [ ] `requirements_local` contains pinned CPU versions of `torch` and `torchvision`.
- [ ] `docker build -f Dockerfile.idv -t deepface-idv-local .` completes successfully without errors.
- [ ] The build logs confirm that `torch` and `torchvision` were installed correctly.

## Out of Scope
- Pushing the image to a remote registry (e.g., Railway).
- Running integration tests inside the container (covered by local unit tests).
