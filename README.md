# LaunchPad Resume AI

LaunchPad Resume AI is a full-stack resume scoring app with a modern Next.js frontend and a FastAPI backend.

It provides:

- PDF resume upload
- Mock ATS-style scoring
- Recruiter-style visual feedback sections
- Dockerized local development stack

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript
- Backend: FastAPI, Uvicorn
- Infra: Docker Compose, PostgreSQL, Redis

## Services

- `web`: Next.js app on `http://localhost:3000`
- `api`: FastAPI app on `http://localhost:8000`
- `postgres`: PostgreSQL on `localhost:5432`
- `redis`: Redis on `localhost:6379`

## Quick Start (Recommended: Docker)

From repo root:

```bash
docker compose up --build
```

Then verify:

- Frontend: `http://localhost:3000`
- API health: `http://localhost:8000/health`

## Local Development (Without Docker)

### Frontend

```bash
cd frontend
npm install
npm run build
npm run dev
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### `GET /health`

Returns service health.

Example response:

```json
{ "status": "ok" }
```

### `POST /resume/score`

Accepts one PDF file (`multipart/form-data`, field name: `file`) and returns mock scoring JSON.

Example response:

```json
{
  "filename": "resume.pdf",
  "score": 82,
  "summary": "Solid structure and impact-oriented bullets. Improve keyword alignment.",
  "highlights": [
    "Clear section organization",
    "Quantified achievements detected",
    "Action verbs are consistent"
  ]
}
```

## Project Structure

```text
.
+-- backend
�   +-- app
�   �   +-- main.py
�   +-- Dockerfile
�   +-- requirements.txt
+-- frontend
�   +-- src
�   �   +-- app
�   �   +-- components
�   +-- Dockerfile
�   +-- next.config.mjs
+-- docker-compose.yml
```

## Verification Checklist

1. `docker compose up --build` runs without errors.
2. `http://localhost:3000` loads the landing page.
3. `http://localhost:8000/health` returns `{"status":"ok"}`.
4. Uploading a PDF in the UI returns and renders a score card.

## Notes

- The frontend uploader targets `http://api:8000/resume/score` for Docker networking.
- If running frontend outside Docker, ensure API hostname routing is configured accordingly.
