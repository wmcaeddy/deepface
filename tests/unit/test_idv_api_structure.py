import unittest
import os

class TestIdvApiStructure(unittest.TestCase):
    def test_directory_exists(self):
        self.assertTrue(os.path.isdir("deepface/api/src/idv_service"), "idv_service directory should exist")

    def test_is_package(self):
        self.assertTrue(os.path.isfile("deepface/api/src/idv_service/__init__.py"), "idv_service should be a Python package")
