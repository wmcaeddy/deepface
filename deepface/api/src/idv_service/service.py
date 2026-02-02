from typing import Any, Dict
import numpy as np
from deepface import DeepFace
from deepface.api.src.idv_service.utils import normalize_confidence

class VerificationService:
    # pylint: disable=too-few-public-methods
    """
    Service layer for face verification using DeepFace.
    """
    def __init__(self, model_name: str = "VGG-Face", detector_backend: str = "opencv"):
        self.model_name = model_name
        self.detector_backend = detector_backend

    def verify(self, img1: np.ndarray, img2: np.ndarray, **kwargs: Any) -> Dict[str, Any]:
        """
        Verifies if two images represent the same person with an aggressive detector bypass.
        Args:
            img1 (np.ndarray): First image in BGR format.
            img2 (np.ndarray): Second image in BGR format.
            **kwargs: Additional arguments for DeepFace.verify.
        Returns:
            Dict[str, Any]: Verification results.
        """
        try:
            # 1. Attempt fast initial detection
            print("Attempting initial verification with opencv detector...")
            return self._call_verify(img1, img2, detector_backend="opencv", enforce_detection=True, **kwargs)
        except (ValueError, Exception) as e:
            # 2. Aggressive Bypass: Immediately retry without enforcement
            print(f"Initial detection failed or error occurred: {str(e)}")
            print("Aggressive Bypass: Retrying immediately without face detection enforcement...")
            try:
                return self._call_verify(img1, img2, detector_backend="skip", enforce_detection=False, **kwargs)
            except Exception as final_e:
                print(f"Final verification attempt failed: {str(final_e)}")
                raise final_e from e

    def _call_verify(self, img1: np.ndarray, img2: np.ndarray, **kwargs: Any) -> Dict[str, Any]:
        """
        Internal wrapper for DeepFace.verify call.
        """
        model_name = kwargs.get("model_name", self.model_name)
        detector_backend = kwargs.get("detector_backend", self.detector_backend)
        enforce_detection = kwargs.get("enforce_detection", True)
        align = kwargs.get("align", True)

        # Pass parameters explicitly to satisfy type checkers
        result = DeepFace.verify(
            img1_path=img1,
            img2_path=img2,
            model_name=model_name,
            detector_backend=detector_backend,
            enforce_detection=enforce_detection,
            align=align,
            **{k: v for k, v in kwargs.items()
               if k not in ["model_name", "detector_backend", "enforce_detection", "align"]}
        )

        # Ensure confidence is normalized according to IDV requirements
        if "confidence" not in result or result["confidence"] is None:
            result["confidence"] = normalize_confidence(
                result["distance"], result["threshold"]
            )

        return result
