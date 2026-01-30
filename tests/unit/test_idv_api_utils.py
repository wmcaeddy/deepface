import unittest
import numpy as np
import base64
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

class TestIdvApiUtils(unittest.TestCase):
    def test_decode_image_base64(self):
        try:
            from deepface.api.src.idv_service.utils import decode_image
        except ImportError:
            self.fail("Could not import decode_image from deepface.api.src.idv_service.utils")

        # Create a small 2x2 black image
        img = np.zeros((2, 2, 3), dtype=np.uint8)
        import cv2
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        data_uri = f"data:image/jpeg;base64,{img_base64}"

        decoded_img = decode_image(data_uri)
        
        self.assertIsInstance(decoded_img, np.ndarray)
        self.assertEqual(decoded_img.shape, (2, 2, 3))
        self.assertTrue(np.all(decoded_img == 0))

    def test_decode_image_no_prefix(self):
        from deepface.api.src.idv_service.utils import decode_image
        # Create a small 2x2 black image
        img = np.zeros((2, 2, 3), dtype=np.uint8)
        import cv2
        _, buffer = cv2.imencode('.jpg', img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        decoded_img = decode_image(img_base64)
        
        self.assertIsInstance(decoded_img, np.ndarray)
        self.assertEqual(decoded_img.shape, (2, 2, 3))

    def test_decode_image_invalid_base64(self):
        from deepface.api.src.idv_service.utils import decode_image
        # Valid base64 but not an image
        invalid_img_base64 = base64.b64encode(b"not an image").decode('utf-8')
        with self.assertRaises(ValueError) as cm:
            decode_image(invalid_img_base64)
        self.assertIn("Could not decode image from base64", str(cm.exception))

    def test_decode_image_corrupt_base64(self):
        from deepface.api.src.idv_service.utils import decode_image
        # Truly invalid base64
        with self.assertRaises(ValueError) as cm:
            decode_image("!!!")
        self.assertIn("Invalid base64 data", str(cm.exception))
