# MR AI

**Personal AI Assistant – Digital Chief of Staff style**  
Built for **MR AI**

---

### Live Capabilities (now)

| Component            | Status | Description |
|----------------------|--------|-------------|
| **Job Hunter Agent** | LIVE   | Real search on RemoteOK + Remotive |
| **Task Tracker**     | LIVE   | Creates review tasks for found jobs |
| **FastAPI layer**    | LIVE   | `/jobs/search` and `/status` endpoints |
| **Email Agent**      | Ready  | Structure for Gmail readonly OAuth |
| **System Builder**   | Ready  | Project scaffolding plans |
| **Core Coordinator** | LIVE   | Unifies all agents |

---

### Quick Start

```bash
pip install -r requirements.txt
python main.py
```

This runs a **live** search for remote Python Developer jobs and creates tracking tasks.

### Run the API

```bash
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Then open:
- http://localhost:8000/
- http://localhost:8000/jobs/search?query=Python+developer
- http://localhost:8000/status

---

### Project Structure

```
mr-ai-jarvis/
├── main.py                 # CLI entry – live job hunt
├── requirements.txt
├── api/
│   └── main.py             # FastAPI app
├── agents/
│   ├── job_hunter.py       # Real public job feeds
│   ├── email_agent.py
│   └── system_builder.py
└── core/
    ├── jarvis.py           # MR AI coordinator
    └── tasks.py            # Simple task tracker
```

---

### Important Notes

- Job search uses **public feeds only** (RemoteOK + Remotive).
- **No applications are submitted automatically.**
- Email sending is not enabled.
- Device / phone / radar features are intentionally excluded.

---

**At your service.**  
— MR AI
