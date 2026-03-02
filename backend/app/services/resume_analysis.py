import re

def analyze_resume(text: str):

    # Email
    email = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", text)
    
    # Phone
    phone = re.findall(r"\+?\d[\d\s\-]{8,15}", text)

    # Skills (basic keyword detection)
    common_skills = [
        "python", "java", "c++", "react", "node", 
        "aws", "docker", "sql", "machine learning",
        "fastapi", "typescript"
    ]

    detected_skills = []
    lower_text = text.lower()

    for skill in common_skills:
        if skill in lower_text:
            detected_skills.append(skill)

    # Very basic section split (improve later)
    experience_section = ""
    education_section = ""

    if "experience" in lower_text:
        experience_section = text.lower().split("experience")[-1][:500]

    if "education" in lower_text:
        education_section = text.lower().split("education")[-1][:300]

    return {
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None,
        "skills": detected_skills,
        "experience_preview": experience_section,
        "education_preview": education_section
    }