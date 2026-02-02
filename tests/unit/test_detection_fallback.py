import unittest
from unittest.mock import patch, MagicMock
import numpy as np
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

class TestDetectionFallback(unittest.TestCase):
    @patch("deepface.DeepFace.verify")
    def test_verify_fallback_chain(self, mock_verify):
        """
        Tests that the verification service falls back from opencv -> mtcnn -> enforce_detection=False
        """
        from deepface.api.src.idv_service.service import VerificationService
        
        # Define side effects for consecutive calls
        # 1. OpenCV fails (ValueError: Face could not be detected)
        # 2. MTCNN succeeds
        mock_verify.side_effect = [
            ValueError("Face could not be detected"),
            {
                "verified": True,
                "distance": 0.1,
                "threshold": 0.4,
                "model": "VGG-Face",
                "detector_backend": "mtcnn"
            }
        ]

        img1 = np.zeros((100, 100, 3), dtype=np.uint8)
        img2 = np.zeros((100, 100, 3), dtype=np.uint8)
        
        service = VerificationService()
        result = service.verify(img1, img2)
        
        self.assertTrue(result["verified"])
        self.assertEqual(result["detector_backend"], "mtcnn")
        
        # Verify it was called twice
        self.assertEqual(mock_verify.call_count, 2)
        
        # Check call arguments for each attempt
        calls = mock_verify.call_args_list
        self.assertEqual(calls[0].kwargs["detector_backend"], "opencv")
        self.assertEqual(calls[1].kwargs["detector_backend"], "mtcnn")

    @patch("deepface.DeepFace.verify")
    def test_verify_final_fallback_no_enforcement(self, mock_verify):
        """
        Tests that the service eventually disables enforcement if all detectors fail
        """
        from deepface.api.src.idv_service.service import VerificationService
        
        # Define side effects:
        # 1. OpenCV fails
        # 2. MTCNN fails
        # 3. Final attempt without enforcement succeeds
        mock_verify.side_effect = [
            ValueError("OpenCV failed"),
            ValueError("MTCNN failed"),
            {
                "verified": False,
                "distance": 0.6,
                "threshold": 0.4,
                "detector_backend": "skip"
            }
        ]

        img1 = np.zeros((100, 100, 3), dtype=np.uint8)
        img2 = np.zeros((100, 100, 3), dtype=np.uint8)
        
        service = VerificationService()
        result = service.verify(img1, img2)
        
        self.assertFalse(result["verified"])
        self.assertEqual(mock_verify.call_count, 3)
        
        calls = mock_verify.call_args_list
        self.assertTrue(calls[2].kwargs["enforce_detection"] is False)

if __name__ == "__main__":
    unittest.main()
