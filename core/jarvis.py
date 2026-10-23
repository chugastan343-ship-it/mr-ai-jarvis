"""
Core JARVIS
The main brain that coordinates all agents.
"""

from agents.job_hunter import JobHunterAgent
from agents.email_agent import EmailAgent
from agents.system_builder import SystemBuilderAgent

class Jarvis:
    def __init__(self):
        self.name = "JARVIS"
        self.job_hunter = JobHunterAgent()
        self.email_agent = EmailAgent()
        self.system_builder = SystemBuilderAgent()
        print(f"{self.name} online. All systems operational.")

    def status_report(self):
        print("\n=== JARVIS Status Report ===")
        print(self.job_hunter.status())
        print(self.email_agent.status())
        print(self.system_builder.status())
        print("=============================\n")

    def run(self):
        self.status_report()
        print("At your service, Sir.")
