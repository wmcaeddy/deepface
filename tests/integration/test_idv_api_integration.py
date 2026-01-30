import unittest
import os
import sys
import base64
import cv2
from fastapi.testclient import TestClient

# Add the project root to sys.path
sys.path.append(os.getcwd())

# pylint: disable=wrong-import-position
from deepface.api.src.idv_service.app import app

class TestIdvApiIntegration(unittest.TestCase):
    def setUp(self) -> None:
        self.client = TestClient(app)
        self.dataset_path = "tests/unit/dataset"

    def get_image_base64(self, filename: str) -> str:
        path = os.path.join(self.dataset_path, filename)
        img = cv2.imread(path)
        if img is None:
            raise FileNotFoundError(f"Could not load {path}")
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        return f"data:image/jpeg;base64,{img_base64}"

    def test_verify_integration_positive(self) -> None:
        """Test verification of the same person."""
        img1_b64 = self.get_image_base64("img1.jpg")
        img2_b64 = self.get_image_base64("img2.jpg")

        payload = {
            "img1": img1_b64,
            "img2": img2_b64,
            "detector_backend": "skip"
        }

        response = self.client.post("/verify", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("verified", data)
        self.assertIn("confidence", data)
        self.assertTrue(data["verified"])

    def test_verify_integration_negative(self) -> None:
        """Test verification of different persons."""
        img1_b64 = self.get_image_base64("img1.jpg")
        img2_b64 = self.get_image_base64("img3.jpg")

        payload = {
            "img1": img1_b64,
            "img2": img2_b64,
            "detector_backend": "skip"
        }

        response = self.client.post("/verify", json=payload)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("verified", data)
        self.assertIn("confidence", data)
        # img1 and img3 are usually different persons
        self.assertFalse(data["verified"])
