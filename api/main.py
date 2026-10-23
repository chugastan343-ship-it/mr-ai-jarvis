"""
MR AI – Simple FastAPI entry point
Exposes job search and status endpoints.
"""

from __future__ import annotations

from fastapi import FastAPI, Query
from agents.job_hunter import research_public_jobs
from core.jarvis import MR_AI

app = FastAPI(
    title="MR AI",
    description="Personal AI Assistant – Digital Chief of Staff style",
    version="0.2.0",
)

mr_ai = MR_AI()


@app.get("/")
async def root():
    return {
        "name": "MR AI",
        "status": "ONLINE",
        "role": "Digital Chief of Staff",
    }


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/status")
async def status():
    return mr_ai.status_report()


@app.get("/jobs/search")
async def search_jobs(
    query: str = Query(default="Python developer", min_length=2, max_length=180),
    limit: int = Query(default=15, ge=1, le=50),
):
    """Live public job search. No applications are submitted."""
    return await research_public_jobs(query=query, limit=limit)
