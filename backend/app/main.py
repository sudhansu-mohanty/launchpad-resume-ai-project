from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="LaunchPad Resume AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/resume/score")
async def score_resume(file: UploadFile = File(...)) -> dict[str, object]:
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    return {
        "filename": file.filename,
        "score": 82,
        "summary": "Solid structure and impact-oriented bullets. Improve keyword alignment.",
        "highlights": [
            "Clear section organization",
            "Quantified achievements detected",
            "Action verbs are consistent",
        ],
    }
