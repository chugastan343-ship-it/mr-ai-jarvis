"""
Email Agent - MR AI
Structure ready for Gmail readonly integration.
Does not send email. Readonly only when connected.
"""

from __future__ import annotations


class EmailAgent:
    def __init__(self):
        self.name = "Email Agent"
        self.connected = False
        self.provider = "gmail"

    def status(self) -> str:
        state = "CONNECTED" if self.connected else "READY (awaiting OAuth)"
        return f"{self.name} — {state}"

    def connect_status(self) -> dict:
        return {
            "agent": self.name,
            "provider": self.provider,
            "connected": self.connected,
            "scopes": ["gmail.readonly"],
            "note": "OAuth configuration required before reading mailbox.",
        }

    def read_latest(self, limit: int = 5) -> dict:
        if not self.connected:
            return {
                "status": "NOT_CONNECTED",
                "message": "Gmail OAuth not configured yet. No emails read.",
                "emails": [],
            }
        # Placeholder for future Gmail API integration
        return {
            "status": "NOT_IMPLEMENTED",
            "message": "Gmail connector not yet wired in this repository.",
            "emails": [],
        }
