import unittest
from fastapi.testclient import TestClient
import os
import sys
import base64
import numpy as np
import cv2

# Add the project root to sys.path
sys.path.append(os.getcwd())

from deepface.api.src.idv_service.app import app

class TestIdvApiEndpoints(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_verify_endpoint_success(self):
        # Create small dummy images
        img = np.zeros((100, 100, 3), dtype=np.uint8)
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        data_uri = f"data:image/jpeg;base64,{img_base64}"

        payload = {
            "img1": data_uri,
            "img2": data_uri
        }

        # We need to mock the service layer to avoid actual DeepFace processing in unit tests
        from unittest.mock import patch
        with patch("deepface.api.src.idv_service.app.verification_service.verify") as mock_verify:
            mock_verify.return_value = {
                "verified": True,
                "distance": 0.1,
                "threshold": 0.4,
                "confidence": 87.5
            }
            
            response = self.client.post("/verify", json=payload)
            
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertTrue(data["verified"])
            self.assertEqual(data["confidence"], 87.5)
            mock_verify.assert_called_once()

    def test_verify_endpoint_invalid_input(self):
        payload = {
            "img1": "not-base64",
            "img2": "data:image/jpeg;base64,invalid"
        }
        
        # This should return 400 or 422 depending on how we handle it
        # If decoding fails in the endpoint logic, we should return 400
        response = self.client.post("/verify", json=payload)
        self.assertEqual(response.status_code, 400)
        self.assertIn("error", response.json()["detail"])
