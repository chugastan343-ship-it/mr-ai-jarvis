"""
Simple in-memory task tracker for MR AI.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any


class TaskTracker:
    def __init__(self):
        self._tasks: list[dict[str, Any]] = []
        self._next_id = 1

    def create(self, title: str, description: str = "", agent: str = "manual") -> dict:
        task = {
            "id": self._next_id,
            "title": title[:255],
            "description": description[:2000],
            "status": "PENDING",
            "agent": agent,
            "created_at": datetime.utcnow().isoformat() + "Z",
            "updated_at": datetime.utcnow().isoformat() + "Z",
        }
        self._tasks.append(task)
        self._next_id += 1
        return task

    def list(self, status: str | None = None) -> list[dict]:
        if status:
            return [t for t in self._tasks if t["status"] == status.upper()]
        return list(self._tasks)

    def update_status(self, task_id: int, status: str) -> dict | None:
        for task in self._tasks:
            if task["id"] == task_id:
                task["status"] = status.upper()
                task["updated_at"] = datetime.utcnow().isoformat() + "Z"
                return task
        return None


# Shared instance for simple use
tracker = TaskTracker()
