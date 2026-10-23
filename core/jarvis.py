"""
MR AI Core
Coordinates all agents. Calm, proactive, loyal.
"""

from __future__ import annotations

from agents.job_hunter import JobHunterAgent
from agents.email_agent import EmailAgent
from agents.system_builder import SystemBuilderAgent


class MR_AI:
    def __init__(self):
        self.name = "MR AI"
        self.job_hunter = JobHunterAgent()
        self.email_agent = EmailAgent()
        self.system_builder = SystemBuilderAgent()
        print(f"{self.name} online. All core systems operational.")

    def status_report(self) -> dict:
        return {
            "name": self.name,
            "status": "ONLINE",
            "agents": {
                "job_hunter": self.job_hunter.status(),
                "email": self.email_agent.status(),
                "system_builder": self.system_builder.status(),
            },
        }

    async def hunt_jobs(self, query: str = "Python developer", limit: int = 15):
        return await self.job_hunter.search(query=query, limit=limit)

    def run(self):
        report = self.status_report()
        print("\n=== MR AI Status Report ===")
        for agent, status in report["agents"].items():
            print(f"  • {status}")
        print("===========================\n")
        print("At your service.")
