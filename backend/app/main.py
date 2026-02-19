import os

import asyncpg
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from redis.asyncio import Redis

app = FastAPI(title="LaunchPad Resume AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://web:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://launchpad:launchpad@postgres:5432/launchpad_db"
)
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

db_connected = False
redis_connected = False


@app.on_event("startup")
async def startup() -> None:
    global db_connected, redis_connected

    try:
        connection = await asyncpg.connect(DATABASE_URL)
        await connection.close()
        db_connected = True
    except Exception:
        db_connected = False

    try:
        redis = Redis.from_url(REDIS_URL)
        await redis.ping()
        await redis.close()
        redis_connected = True
    except Exception:
        redis_connected = False


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health/dependencies")
def health_dependencies() -> dict[str, str]:
    return {
        "postgres": "connected" if db_connected else "unavailable",
        "redis": "connected" if redis_connected else "unavailable",
    }

