import requests
import json

# Add your API key
GROQ_API_KEY = "your_groq_api_key_here"

API_URL = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {GROQ_API_KEY}",
    "Content-Type": "application/json"
}

def ask_groq(prompt):

    payload = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2
    }

    response = requests.post(API_URL, headers=headers, json=payload)

    result = response.json()

    return result["choices"][0]["message"]["content"]