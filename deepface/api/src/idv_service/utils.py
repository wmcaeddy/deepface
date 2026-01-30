import base64
import numpy as np
import cv2

def decode_image(data_uri: str) -> np.ndarray:
    """
    Decodes a base64 encoded image (Data URI) to an OpenCV format (numpy array).
    Args:
        data_uri (str): Base64 encoded image string, optionally with data URI prefix.
    Returns:
        np.ndarray: Decoded image in BGR format.
    Raises:
        ValueError: If the input is not a valid base64 encoded image.
    """
    try:
        if "," in data_uri:
            # Split data URI prefix if present
            _, encoded = data_uri.split(",", 1)
        else:
            encoded = data_uri

        decoded_bytes = base64.b64decode(encoded)
        nparr = np.frombuffer(decoded_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise ValueError("Could not decode image from base64")

        return img
    except Exception as e:
        raise ValueError(f"Invalid base64 data: {str(e)}") from e

def normalize_confidence(distance: float, threshold: float) -> float:
    """
    Normalizes a distance metric to a 0-100% confidence score.
    A distance equal to the threshold results in 50% confidence.
    Args:
        distance (float): The distance between two face embeddings.
        threshold (float): The threshold for the distance metric.
    Returns:
        float: Normalized confidence score (0-100).
    """
    if distance <= 0:
        return 100.0

    # If distance is at threshold, confidence is 50%
    # If distance is 0, confidence is 100%
    # If distance is 2*threshold, confidence is 0%

    confidence = (1 - (distance / (2 * threshold))) * 100

    return float(max(0.0, min(100.0, round(confidence, 2))))
