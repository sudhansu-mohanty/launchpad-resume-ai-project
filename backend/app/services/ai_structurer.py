import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

def ai_structure_resume(text: str):

    prompt = f"""
You are a resume parser AI.

Convert this resume into structured JSON.
Return ONLY valid JSON.

Structure:
{{
  "name": "",
  "email": "",
  "phone": "",
  "skills": [],
  "education": [],
  "experience": []
}}

Resume:
{text}
"""

    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "phi",
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()["response"]

    try:
        return json.loads(result)
    except:
        return {"raw_output": result}