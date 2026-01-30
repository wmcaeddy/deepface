import unittest
import os
import sys

# Add the project root to sys.path
sys.path.append(os.getcwd())

class TestIdvNormalization(unittest.TestCase):
    def test_normalize_distance_cosine(self):
        from deepface.api.src.idv_service.utils import normalize_confidence
        
        # In cosine, 0 is perfect match, 1 is no match. Assume threshold is 0.4
        threshold = 0.4
        # If distance is 0, confidence should be 100
        self.assertEqual(normalize_confidence(0.0, threshold), 100.0)
        
        # If distance is exactly at threshold, it should be 50.0
        self.assertEqual(normalize_confidence(0.4, threshold), 50.0)
        
        # If distance is high (e.g. 0.8 which is 2*threshold), confidence should be 0.0
        self.assertEqual(normalize_confidence(0.8, threshold), 0.0)
        
    def test_normalize_confidence_range(self):
        from deepface.api.src.idv_service.utils import normalize_confidence
        
        threshold = 0.4
        # Ensure result is always between 0 and 100
        self.assertEqual(normalize_confidence(-1.0, threshold), 100.0)
        self.assertEqual(normalize_confidence(2.0, threshold), 0.0)
