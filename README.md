# MR AI Command Center

**Personal AI Assistant – Digital Chief of Staff style**  
Built for **MR AI / Boss Ferisi**

---

### Live Features

| Feature | Status | Notes |
|---------|--------|-------|
| **Job Hunter** | LIVE | RemoteOK + Remotive public feeds |
| **Command Center UI** | LIVE | Cyan HUD + Working Mode (red) |
| **Matrix background** | LIVE | Animated matrix rain |
| **Radar visual** | LIVE | Decorative scanner only |
| **FastAPI backend** | LIVE | `/jobs/search`, `/status` |
| **Task tracking** | LIVE | Auto-created on job scan |
| **Mode toggle** | LIVE | Normal ↔ Working |

---

### Quick Start

**1. Backend**
```bash
pip install -r requirements.txt
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

**2. Frontend**
Open `web/index.html` in browser  
(or serve it):
```bash
cd web && python -m http.server 5500
```
Then go to: http://localhost:5500

**3. CLI job search**
```bash
python main.py
```

---

### Interface

- Dark cyber HUD (inspired by the Command Center design)
- Matrix rain background
- Animated radar scanner (visual only – no real sensors)
- Job Hunter panel with live results
- Agents / Tasks / Chat / System panels
- Normal Mode (cyan) ↔ Working Mode (red)

---

### Important

- Job search uses **public feeds only**
- **No applications are submitted automatically**
- Radar is **visual decoration only** – no Wi-Fi/Bluetooth/device scanning
- No ADB, fastboot, or surveillance modules

---

**At your service.**  
— MR AI
