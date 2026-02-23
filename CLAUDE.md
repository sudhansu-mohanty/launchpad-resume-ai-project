# CLAUDE.md — Launchpad Resume AI Service

## Project Overview

Full-stack AI-powered resume scoring app. Users upload a PDF resume and receive an ATS-style score (0–100) with a breakdown across five categories: Structure, Impact, Keywords, Clarity, and Formatting.

**Frontend**: Next.js 14 (TypeScript, static export)
**Backend**: FastAPI (Python 3.11)
**Infra**: Docker Compose with PostgreSQL 16 and Redis 7

---

## Commands

### Docker (recommended)
```bash
# Start all services
docker compose up --build

# Stop all services
docker compose down
```

### Frontend (local)
```bash
cd frontend
npm install
npm run dev        # Dev server on http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

### Backend (local)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Verify
- Frontend: http://localhost:3000
- Backend health: http://localhost:8000/health

---

## Architecture

```
frontend/src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, Inter font
│   ├── page.tsx            # Main page — composes all sections
│   └── globals.css         # Design tokens (CSS custom properties), base styles
└── components/
    ├── Navbar.tsx           # Sticky nav with scroll-blur effect
    ├── HeroSection.tsx      # Animated score preview hero
    ├── ResumeUploader.tsx   # PDF drag-and-drop upload form
    ├── ScoreCard.tsx        # Score results with metric breakdowns
    ├── RecruiterShowcase.tsx # Recruiter lens preview with animations
    ├── Faq.tsx              # FAQ accordion
    └── Footer.tsx           # Footer

backend/app/
└── main.py                 # FastAPI app — CORS, /health, /resume/extract
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Returns `{"status": "ok"}` |
| POST | `/resume/extract` | Accepts `multipart/form-data` PDF, returns score JSON |

### `/resume/extract` Response Shape
```json
{
  "filename": "resume.pdf",
  "score": 82,
  "structure": 85,
  "impact": 78,
  "keywords": 80,
  "clarity": 90,
  "formatting": 75,
  "summary": "...",
  "highlights": ["..."],
  "raw_text": "..."
}
```

> **Note**: Scoring is currently mocked/static. Real AI scoring is not yet implemented.

---

## Environment Variables

No `.env` file exists yet. The frontend reads:
- `NEXT_PUBLIC_API_BASE_URL` — defaults to `http://localhost:8000`

Docker Compose hardcodes database credentials:
- `POSTGRES_USER=launchpad`
- `POSTGRES_PASSWORD=launchpad`
- `POSTGRES_DB=launchpad_db`

When adding secrets, create `.env` at the repo root (already gitignored).

---

## Styling Conventions

- **No Tailwind utility classes in components** — all component styles are inline JSX (`style={{}}`), except for base/utility classes defined in `globals.css`.
- Design tokens live in `globals.css` as CSS custom properties (`--lp-bg`, `--lp-lime`, `--lp-sage`, etc.). Use these tokens, don't hardcode colors.
- Color palette: black `#080A09`, sage green `#92AA83`, lime `#C8E86A`, off-white `#E8EDE6`.
- Typography uses `clamp()` for fluid scaling.
- Animations: `IntersectionObserver` for scroll reveals; `requestAnimationFrame` for number counters.

---

## Key Constraints & Notes

- **Static export**: `next.config.mjs` sets `output: "export"`. No server-side rendering. Avoid Next.js APIs that require a Node server (e.g., `getServerSideProps`).
- **CORS**: Backend currently only allows `http://localhost:3000`. Update `main.py` if deploying to a different origin.
- **No auth**: The app is stateless — no user accounts or session management.
- **No tests**: No test suite exists yet. Add `pytest` for backend and `jest`/`@testing-library/react` for frontend when adding tests.
- **pdfplumber** handles PDF text extraction on the backend; only PDF MIME types are accepted by the uploader.
- PostgreSQL and Redis are provisioned but not yet used by the application logic.
