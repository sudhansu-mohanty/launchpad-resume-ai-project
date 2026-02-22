from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import re

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

    # Extract text from PDF
    with pdfplumber.open(file.file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    # Print extracted text (for debugging)
    print(text)

    # Extract email
    email = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)

    # Extract phone
    phone = re.findall(r"\+?\d[\d\s\-]{8,15}", text)

    # Dummy scoring
    score = 80
    structure = 16
    impact = 15
    keywords = 17
    clarity = 16
    formatting = 16

    return {
        "filename": file.filename,
        "score": score,
        "structure": structure,
        "impact": impact,
        "keywords": keywords,
        "clarity": clarity,
        "formatting": formatting,
        "summary": "Resume extracted and basic scoring applied.",
        "highlights": [
            f"Email detected: {email[0] if email else 'None'}",
            f"Phone detected: {phone[0] if phone else 'None'}",
            "Resume content successfully parsed"
        ],
        "raw_text": text
    }