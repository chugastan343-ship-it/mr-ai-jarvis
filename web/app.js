/* MR AI Command Center – Frontend Logic */

const API_BASE = localStorage.getItem('mr_ai_api') || 'http://localhost:8000';

// ---------- MATRIX RAIN ----------
function initMatrix() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンMR AI';
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--c').trim() || '#00f3ff';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 50);
}

// ---------- CLOCK & FAKE TELEMETRY (visual only) ----------
function updateClock() {
  const el = document.getElementById('clock');
  if (el) el.textContent = new Date().toLocaleString();
}
setInterval(updateClock, 1000);
updateClock();

function animateMetrics() {
  const cpu = 28 + Math.floor(Math.random() * 20);
  const mem = 40 + Math.floor(Math.random() * 25);
  const net = 55 + Math.floor(Math.random() * 30);
  const storage = 68 + Math.floor(Math.random() * 15);

  document.getElementById('cpu').textContent = cpu + '%';
  document.getElementById('mem').textContent = mem + '%';
  document.getElementById('net').textContent = net + '%';
  document.getElementById('storage').textContent = storage + '%';
  document.getElementById('cpuBar').style.width = cpu + '%';
  document.getElementById('memBar').style.width = mem + '%';
  document.getElementById('netBar').style.width = net + '%';
  document.getElementById('storageBar').style.width = storage + '%';
}
setInterval(animateMetrics, 3000);
animateMetrics();

// ---------- MODE TOGGLE ----------
const app = document.getElementById('app');
const modeLabel = document.getElementById('modeLabel');
const missionMode = document.getElementById('missionMode');

document.getElementById('modeToggle')?.addEventListener('click', () => {
  app.classList.toggle('working');
  const working = app.classList.contains('working');
  modeLabel.textContent = working ? 'WORKING MODE' : 'NORMAL MODE';
  if (missionMode) missionMode.textContent = working ? 'WORKING' : 'NORMAL';
});

// ---------- PANEL NAV ----------
document.querySelectorAll('.sidebar nav button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.sidebar nav button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const panel = btn.dataset.panel;
    document.querySelectorAll('[id^="panel-"]').forEach(p => p.classList.add('hidden'));
    const target = document.getElementById('panel-' + panel);
    if (target) target.classList.remove('hidden');
    if (panel === 'dashboard') {
      document.getElementById('panel-dashboard')?.classList.remove('hidden');
    }
  });
});

// ---------- JOB SEARCH ----------
async function searchJobs() {
  const query = document.getElementById('jobQuery')?.value?.trim() || 'Python developer';
  const statusEl = document.getElementById('jobStatus');
  const resultsEl = document.getElementById('jobResults');
  statusEl.textContent = 'Scanning public feeds...';
  resultsEl.innerHTML = '';

  try {
    const res = await fetch(`${API_BASE}/jobs/search?query=${encodeURIComponent(query)}&limit=12`);
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();

    statusEl.textContent = `Found ${data.count || 0} jobs for "${data.query}" • Sources: ${(data.sources || []).join(', ')}`;
    document.getElementById('jobsFound').textContent = data.count || 0;

    if (!data.results || data.results.length === 0) {
      resultsEl.innerHTML = '<div class="notice">No matching jobs found right now.</div>';
      return;
    }

    resultsEl.innerHTML = data.results.map(job => `
      <div class="job-card">
        <h3>${escapeHtml(job.title)}</h3>
        <p>${escapeHtml(job.company)} • ${escapeHtml(job.location)}</p>
        <p>Source: ${escapeHtml(job.source || '')}</p>
        <a href="${escapeHtml(job.url)}" target="_blank" rel="noopener">${escapeHtml(job.url)}</a>
      </div>
    `).join('');

    document.getElementById('taskCount').textContent = data.count || 0;
  } catch (err) {
    statusEl.textContent = 'Could not reach API. Is the backend running on ' + API_BASE + '?';
    resultsEl.innerHTML = `<div class="notice">Error: ${escapeHtml(err.message)}. Start backend with: uvicorn api.main:app --reload</div>`;
  }
}

document.getElementById('searchJobsBtn')?.addEventListener('click', searchJobs);

// ---------- CHAT (local echo for now) ----------
function addChat(role, text) {
  const box = document.getElementById('chatBox');
  const div = document.createElement('div');
  div.className = 'chat-msg ' + role;
  div.innerHTML = `<strong>${role === 'user' ? 'YOU' : 'MR AI'}</strong><p>${escapeHtml(text)}</p>`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

document.getElementById('chatSend')?.addEventListener('click', () => {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  addChat('user', msg);
  input.value = '';

  // Simple local responses
  setTimeout(() => {
    let reply = 'Understood, Boss.';
    if (/job|kazi|python|developer/i.test(msg)) {
      reply = 'Job Hunter is ready. Go to Job Hunter panel or click SCAN JOBS.';
      searchJobs();
    } else if (/status|system|hali/i.test(msg)) {
      reply = 'All core systems operational. Job feeds online. No device modules loaded.';
    } else if (/mode|working|normal/i.test(msg)) {
      document.getElementById('modeToggle')?.click();
      reply = 'Mode toggled.';
    } else {
      reply = 'I am online and monitoring. Use Job Hunter to scan remote Python roles, or ask for system status.';
    }
    addChat('assistant', reply);
  }, 400);
});

document.getElementById('chatInput')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('chatSend')?.click();
});

// ---------- QUICK COMMANDS ----------
document.querySelectorAll('.quick-bar button').forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.dataset.cmd;
    if (cmd === 'scan') {
      document.querySelector('[data-panel="jobs"]')?.click();
      searchJobs();
    } else if (cmd === 'status') {
      document.querySelector('[data-panel="system"]')?.click();
      refreshStatus();
    } else if (cmd === 'agents') {
      document.querySelector('[data-panel="agents"]')?.click();
    } else if (cmd === 'mode') {
      document.getElementById('modeToggle')?.click();
    }
  });
});

// ---------- STATUS ----------
async function refreshStatus() {
  const dump = document.getElementById('statusDump');
  try {
    const res = await fetch(API_BASE + '/status');
    const data = await res.json();
    dump.textContent = JSON.stringify(data, null, 2);
  } catch {
    dump.textContent = 'Backend not reachable at ' + API_BASE;
  }
}
document.getElementById('refreshStatus')?.addEventListener('click', refreshStatus);

// ---------- HELPERS ----------
function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"');
}

// ---------- ADD RADAR TO DASHBOARD ----------
function injectRadar() {
  const missionPanel = document.querySelector('#panel-dashboard .panel:nth-child(3)');
  if (!missionPanel) return;
  const radarHtml = `
    <div class="radar-wrap">
      <div class="radar">
        <div class="radar-cross-v"></div>
        <div class="radar-cross-h"></div>
        <div class="radar-dot" style="left:62%;top:38%"></div>
        <div class="radar-dot" style="left:40%;top:55%"></div>
        <div class="radar-dot" style="left:70%;top:60%"></div>
      </div>
    </div>
    <p class="notice" style="text-align:center">VISUAL SCANNER ONLY • NO REAL SENSOR LINK</p>
  `;
  missionPanel.insertAdjacentHTML('beforeend', radarHtml);
}

// Boot
initMatrix();
injectRadar();
console.log('MR AI Command Center online');
