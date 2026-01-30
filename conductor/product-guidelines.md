# Product Guidelines - DeepFace IDV System

## Prose & Documentation Style
- **User-Centric & Accessible:** API documentation and system logs should prioritize ease of integration. Explain concepts clearly and provide actionable error messages.
- **Precision in Reporting:** When describing verification results, use clear, standardized terminology to avoid ambiguity in security-critical contexts.

## Data Handling & Privacy
- **Ephemeral Processing:** Biometric data (images and intermediate representations) must be processed in-memory. No raw biometric data should be persisted to disk after a verification request is finalized.
- **Embedding Security:** If embeddings are generated for internal comparison, they should be treated as sensitive credentials and handled with appropriate memory-safety precautions.

## Verification & Scoring Logic
- **Granular Confidence Percentiles:** The system must return a normalized confidence score (0-100%) for every match. This allows integrating applications to define their own business-logic thresholds (e.g., "Review Required" vs. "Auto-Approve").
- **Transparent Model Selection:** The API must allow clients to explicitly choose between supported DeepFace models (e.g., VGG-Face, Facenet, ArcFace). Documentation must clearly outline the performance vs. accuracy trade-offs for each model.

## Visual Identity & UX
- **Clean & Modern Aesthetic:** Any user-facing components (dashboards, capture widgets) should follow Material Design principles. The UI should convey professional-grade security through clean typography and structured layouts.
- **Non-Interactive First:** System design should prioritize CLI and API interactions, ensuring that any UI serves as an optional observer or management layer rather than a required bottleneck.
