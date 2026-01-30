from typing import Any, Dict
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from deepface.api.src.idv_service.service import VerificationService
from deepface.api.src.idv_service.utils import decode_image

app = FastAPI(title="DeepFace IDV API")
verification_service = VerificationService()

# Serve static files
app.mount("/static", StaticFiles(directory="deepface/api/src/idv_service/static"), name="static")

class VerifyRequest(BaseModel):
    img1: str
    img2: str
    model_name: str = "VGG-Face"
    detector_backend: str = "opencv"

@app.get("/health")

async def health_check() -> Dict[str, str]:

    return {"status": "ok"}



@app.get("/")



async def root() -> FileResponse:



    return FileResponse("deepface/api/src/idv_service/static/index.html")







@app.post("/verify")



async def verify(request: VerifyRequest) -> Dict[str, Any]:

    """

    Endpoint to verify two images.



    """

    try:

        # Decode images

        image1 = decode_image(request.img1)

        image2 = decode_image(request.img2)



        # Perform verification

        result = verification_service.verify(

            img1=image1,

            img2=image2,

            model_name=request.model_name,

            detector_backend=request.detector_backend

        )



        return result

    except ValueError as e:

        raise HTTPException(status_code=400, detail={"error": str(e)}) from e

    except Exception as e:

        raise HTTPException(

            status_code=500,

            detail={"error": "Internal server error", "message": str(e)}

        ) from e
