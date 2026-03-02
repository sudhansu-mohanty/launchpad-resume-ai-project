from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.resume_analysis import analyze_resume
from app.services.ai_structurer import ai_structure_resume
import pdfplumber
import re
import io

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/resume/extract")
async def extract_resume(file: UploadFile = File(...)):

    text = ""

    # Safer file reading (avoids stream pointer issues)
    contents = await file.read()

    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    print("Extracted text length:", len(text))

    # Extract email
    email = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    # Extract phone
    phone = re.findall(
        r"\+?\d[\d\s\-]{8,15}",
        text
    )

    # Dummy scoring (keeping for now)
    score = 80
    structure = 16
    impact = 15
    keywords = 17
    clarity = 16
    formatting = 16

    # Layer 2 — Rule-based analysis
    analysis = analyze_resume(text)

    # Layer 3 — AI structuring (Local Ollama)
    structured_resume = ai_structure_resume(text)

    return {
        "filename": file.filename,
        "score": score,
        "structure": structure,
        "impact": impact,
        "keywords": keywords,
        "clarity": clarity,
        "formatting": formatting,
        "summary": "Resume extracted and analyzed successfully.",
        "highlights": [
            f"Email detected: {email[0] if email else 'None'}",
            f"Phone detected: {phone[0] if phone else 'None'}",
            "Resume content successfully parsed"
        ],
        "analysis": analysis,
        "structured_resume": structured_resume,
        "raw_text": text
    }