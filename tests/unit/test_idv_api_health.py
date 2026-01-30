import unittest
from fastapi.testclient import TestClient
import os
import sys

# Add the project root to sys.path to allow importing the new service
sys.path.append(os.getcwd())

class TestIdvApiHealth(unittest.TestCase):
    def setUp(self):
        try:
            from deepface.api.src.idv_service.app import app
            self.client = TestClient(app)
        except ImportError:
            self.client = None

    def test_app_exists(self):
        self.assertIsNotNone(self.client, "FastAPI app should be importable from deepface.api.src.idv_service.app")

    def test_health_check(self):
        if self.client is None:
            self.fail("Client not initialized")
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})
