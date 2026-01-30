import unittest
import os

class TestIdvApiRequirements(unittest.TestCase):
    def test_requirements_exists(self):
        self.assertTrue(os.path.isfile("deepface/api/src/idv_service/requirements.txt"), "requirements.txt should exist")

    def test_requirements_content(self):
        with open("deepface/api/src/idv_service/requirements.txt", "r") as f:
            content = f.read()
            self.assertIn("fastapi", content.lower())
            self.assertIn("uvicorn", content.lower())
            self.assertIn("python-multipart", content.lower())
