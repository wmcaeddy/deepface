# project dependencies
from deepface import DeepFace
from deepface.commons.logger import Logger

logger = Logger()

def test_extract_faces_default_anti_spoofing_baseline():
    """
    Test that anti_spoofing currently defaults to False in extract_faces.
    """
    img_path = "tests/unit/dataset/img1.jpg"
    img_objs = DeepFace.extract_faces(img_path=img_path, detector_backend="opencv")
    
    for img_obj in img_objs:
        assert "is_real" not in img_obj.keys()
        assert "antispoof_score" not in img_obj.keys()
    
    logger.info("✅ extract_faces_default_anti_spoofing_baseline test is done")

def test_verify_default_anti_spoofing_baseline():
    """
    Test that anti_spoofing currently defaults to False in verify.
    """
    img1_path = "tests/unit/dataset/img1.jpg"
    img2_path = "tests/unit/dataset/img2.jpg"
    
    result = DeepFace.verify(img1_path=img1_path, img2_path=img2_path, detector_backend="opencv")
    
    assert "is_real" not in result.keys()
    assert "antispoof_score" not in result.keys()
    
    logger.info("✅ verify_default_anti_spoofing_baseline test is done")
