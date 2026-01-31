# Specification - Fix Railway Deployment Dependencies

## Overview
The Railway deployment failed due to a dependency conflict:
- `tensorflow==2.13.1` requires `typing-extensions<4.6.0`
- `psycopg[binary]==3.2.13` requires `typing-extensions>=4.6`

This track aims to resolve this by adjusting the version of `psycopg[binary]` to be compatible with the existing `tensorflow` version, which is critical for the application.

## Requirements
- Downgrade `psycopg[binary]` in `requirements_local` to a version that supports `typing-extensions<4.6.0`.
- Ensure no other conflicts are introduced.

## Acceptance Criteria
- `requirements_local` is updated.
- `pip install -r requirements_local` succeeds (can be verified via a test Docker build or dry run).
