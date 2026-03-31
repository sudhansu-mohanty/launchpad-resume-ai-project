from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from app.services.resume_analysis import analyze_resume
from app.services.ai_structurer import ai_structure_resume
from app.services.resume_scoring import score_resume
from app.services.job_service import search_jobs
import pdfplumber
import re
import io

app = FastAPI()

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
    contents = await file.read()

    # Extract PDF 
    with pdfplumber.open(io.BytesIO(contents)) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + "\n"

    print("Extracted text length:", len(text))

   
    email = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )


    phone = re.findall(
        r"\+?\d[\d\s\-]{8,15}",
        text
    )

    
    analysis = analyze_resume(text)

    # AI structuring
    structured_resume = ai_structure_resume(text)

    # AI scoring
    ai_score = score_resume(text)

    if not isinstance(ai_score, dict):
        ai_score = {}

    return {
        "filename": file.filename,

        "score": ai_score.get("total_score", 0),
        "skills_score": ai_score.get("skills", 0),
        "experience_score": ai_score.get("experience", 0),
        "projects_score": ai_score.get("projects", 0),
        "education_score": ai_score.get("education", 0),
        "impact_score": ai_score.get("impact", 0),
        "formatting_score": ai_score.get("formatting", 0),

        "strengths": ai_score.get("strengths", []),
        "weaknesses": ai_score.get("weaknesses", []),

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
@app.get("/jobs")
def get_jobs(query: str):
    return search_jobs(query)

@app.get("/favicon.ico")
def favicon():
    return {}