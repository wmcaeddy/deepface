import unittest
from unittest.mock import patch, MagicMock
import numpy as np
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

class TestAggressiveBypass(unittest.TestCase):
    @patch("deepface.DeepFace.verify")
    def test_verify_aggressive_bypass(self, mock_verify):
        """
        Tests that the verification service immediately skips enforcement after one failure.
        """
        from deepface.api.src.idv_service.service import VerificationService
        
        # Define side effects for consecutive calls
        # 1. OpenCV fails (ValueError: Face could not be detected)
        # 2. Skip/No-Enforcement attempt succeeds
        mock_verify.side_effect = [
            ValueError("Face could not be detected"),
            {
                "verified": True,
                "distance": 0.1,
                "threshold": 0.4,
                "model": "VGG-Face",
                "detector_backend": "skip"
            }
        ]

        img1 = np.zeros((100, 100, 3), dtype=np.uint8)
        img2 = np.zeros((100, 100, 3), dtype=np.uint8)
        
        service = VerificationService()
        result = service.verify(img1, img2)
        
        self.assertTrue(result["verified"])
        self.assertEqual(result["detector_backend"], "skip")
        
        # Verify it was called exactly twice (skipping the robust detector step)
        self.assertEqual(mock_verify.call_count, 2)
        
        # Check call arguments for each attempt
        calls = mock_verify.call_args_list
        self.assertEqual(calls[0].kwargs["detector_backend"], "opencv")
        self.assertTrue(calls[0].kwargs["enforce_detection"] is True)
        
        self.assertEqual(calls[1].kwargs["detector_backend"], "skip")
        self.assertTrue(calls[1].kwargs["enforce_detection"] is False)

if __name__ == "__main__":
    unittest.main()
