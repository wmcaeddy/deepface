import unittest
from unittest.mock import patch, MagicMock
import numpy as np
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

from deepface import DeepFace

class TestIdvApiService(unittest.TestCase):
    @patch("deepface.DeepFace.verify")
    def test_verify_images_success(self, mock_verify):
        from deepface.api.src.idv_service.service import VerificationService
        
        # Mock response from DeepFace.verify
        mock_verify.return_value = {
            "verified": True,
            "distance": 0.1,
            "threshold": 0.4,
            "model": "VGG-Face",
            "detector_backend": "opencv",
            "similarity_metric": "cosine"
        }

        img1 = np.zeros((100, 100, 3), dtype=np.uint8)
        img2 = np.zeros((100, 100, 3), dtype=np.uint8)
        
        service = VerificationService()
        result = service.verify(img1, img2)
        
        self.assertTrue(result["verified"])
        self.assertEqual(result["distance"], 0.1)
        mock_verify.assert_called_once()

    def test_verify_images_import_error(self):
        try:
            from deepface.api.src.idv_service.service import VerificationService
        except ImportError:
            self.fail("Could not import VerificationService from deepface.api.src.idv_service.service")
