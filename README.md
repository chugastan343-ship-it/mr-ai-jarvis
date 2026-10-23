# MR AI

**Personal AI Assistant – Digital Chief of Staff style**  
Built for **MR AI**

---

### What works right now

| Component              | Status     | Description                                      |
|------------------------|------------|--------------------------------------------------|
| **Job Hunter Agent**   | LIVE       | Searches RemoteOK + Remotive for real remote jobs |
| **Python Developer**   | Default    | Profile focused on Python / Backend roles         |
| **Multi-Agent Core**   | Active     | Job Hunter + Email + System Builder structure     |
| **Email Agent**        | Structure  | Ready for Gmail OAuth integration                 |
| **System Builder**     | Structure  | Ready for project scaffolding                     |

---

### Quick start

```bash
pip install -r requirements.txt
python main.py
```

This will run a **live** search for remote Python Developer jobs and print real results from public job feeds.

No applications are submitted automatically.

---

### Project structure

```
mr-ai-jarvis/
├── main.py                 # Entry point – runs live job search
├── requirements.txt
├── agents/
│   ├── job_hunter.py       # Real RemoteOK + Remotive integration
│   ├── email_agent.py
│   └── system_builder.py
└── core/
    └── jarvis.py
```

---

### Next planned upgrades
- Gmail readonly integration
- Task & memory system
- Simple FastAPI backend
- Scheduler for automatic job scans

---

**At your service.**  
— MR AI
