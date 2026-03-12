import requests
import json
import re

# Groq API key
GROQ_API_KEY = "your_groq_api_key_here"

API_URL = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}


def score_resume(resume_text: str):

    prompt = f"""
You are an ATS resume scoring system.

Evaluate the resume using these categories:

Skills (0-25)
Experience (0-25)
Projects (0-20)
Education (0-10)
Impact & Achievements (0-10)
Formatting & Clarity (0-10)

Rules:
- Return ONLY valid JSON
- total_score must equal sum of all categories

Example format:
{{
"skills":20,
"experience":18,
"projects":15,
"education":8,
"impact":7,
"formatting":8,
"total_score":76,
"strengths":["good skills","clear experience"],
"weaknesses":["add more quantified results"]
}}

Resume:
{resume_text}
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