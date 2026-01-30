from fastapi import FastAPI

app = FastAPI(title="DeepFace IDV API")

@app.get("/health")
async def health_check():
    return {"status": "ok"}
