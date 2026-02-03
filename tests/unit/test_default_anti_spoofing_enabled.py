# project dependencies
import pytest
from deepface import DeepFace
from deepface.commons.logger import Logger
from deepface.modules.exceptions import SpoofDetected

logger = Logger()

def test_extract_faces_default_anti_spoofing_enabled():
    """
    Test that anti_spoofing defaults to True in extract_faces.
    """
    img_path = "tests/unit/dataset/img1.jpg"
    # Calling without anti_spoofing argument, should be True by default now
    img_objs = DeepFace.extract_faces(img_path=img_path, detector_backend="opencv")
    
    for img_obj in img_objs:
        assert "is_real" in img_obj.keys(), "is_real should be present by default"
        assert "antispoof_score" in img_obj.keys(), "antispoof_score should be present by default"
        assert isinstance(img_obj["is_real"], bool)
        assert isinstance(img_obj["antispoof_score"], float)
    
    logger.info("✅ extract_faces_default_anti_spoofing_enabled test is done")

def test_verify_default_anti_spoofing_enabled():
    """
    Test that anti_spoofing defaults to True in verify.
    """
    img1_path = "tests/unit/dataset/img1.jpg"
    img2_path = "tests/unit/dataset/img2.jpg"
    
    # Calling without anti_spoofing argument, should be True by default now
    # Since these are real images, it should not raise SpoofDetected
    try:
        result = DeepFace.verify(img1_path=img1_path, img2_path=img2_path, detector_backend="opencv")
        assert isinstance(result, dict)
    except SpoofDetected:
        pytest.fail("SpoofDetected raised for a real image")
    
    logger.info("✅ verify_default_anti_spoofing_enabled test is done")