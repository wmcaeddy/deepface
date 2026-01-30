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
