import requests
import json
import re
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

API_URL = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}


def ai_structure_resume(text: str):

    prompt = f"""
You are a resume parser AI.

Convert the resume below into structured JSON.

Return ONLY valid JSON.

Structure:
{{
"name":"",
"email":"",
"phone":"",
"skills":[],
"education":[],
"experience":[],
"certification":[]
}}

Resume:
{text}
"""

    payload = {
        "model": "llama-3.1-8b-instant",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        return {"error": response.text}

    result = response.json()

    try:
        generated_text = result["choices"][0]["message"]["content"]

        json_match = re.search(r"\{.*\}", generated_text, re.DOTALL)

        if json_match:
            return json.loads(json_match.group())

    except Exception as e:
        return {"error": str(e)}

    return {"raw_output": generated_text}