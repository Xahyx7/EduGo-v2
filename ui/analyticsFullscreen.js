// ui/analyticsFullscreen.js

import { appState } from "../state/state.js";

export function openAnalyticsFullscreen() {
  if (document.getElementById("analyticsOverlay")) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="analyticsOverlay" class="analytics-overlay">
      <div class="analytics-shell">
        <header class="analytics-header">
          <h2>Analytics</h2>
          <button id="closeAnalytics">✕</button>
        </header>

        <nav class="analytics-tabs">
          <button id="tabDaily" class="active">Daily</button>
          <button id="tabWeekly">Weekly</button>
          <button id="tabYearly">Yearly</button>
        </nav>

        <section id="analyticsContent" class="analytics-content"></section>
      </div>
    </div>
    `
  );

  document.getElementById("closeAnalytics").onclick = closeAnalyticsFullscreen;
  document.getElementById("tabDaily").onclick = () => switchTab("daily");
  document.getElementById("tabWeekly").onclick = () => switchTab("weekly");
  document.getElementById("tabYearly").onclick = () => switchTab("yearly");

  renderDaily();
}

function closeAnalyticsFullscreen() {
  document.getElementById("analyticsOverlay")?.remove();
}

function switchTab(tab) {
  document
    .querySelectorAll(".analytics-tabs button")
    .forEach(b => b.classList.remove("active"));
  document.getElementById(`tab${capitalize(tab)}`).classList.add("active");

  if (tab === "daily") renderDaily();
  if (tab === "weekly") renderWeekly();
  if (tab === "yearly") renderYearly();
}

/* ================= DAILY ================= */

function renderDaily() {
  const box = document.getElementById("analyticsContent");
  const today = new Date().toDateString();

  const sessions = appState.sessions.filter(
    s => new Date(s.time).toDateString() === today
  );

  const total = sessions.reduce((a, b) => a + b.minutes, 0);

  const subjectMap = {};
  sessions.forEach(s => {
    subjectMap[s.subjectId] = (subjectMap[s.subjectId] || 0) + s.minutes;
  });

  const values = Object.values(subjectMap);
  const max = Math.max(...values, 1);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>Total Study Today</h3>
      <div class="analytics-big-number">${total} min</div>
    </div>

    <div class="analytics-card">
      <h3>By Subject</h3>
      ${
        values.length === 0
          ? "<p class='muted'>No study yet</p>"
          : Object.entries(subjectMap)
              .map(([id, min]) => {
                const name =
                  appState.subjects.find(s => s.id === id)?.name || "Unknown";
                return barRow(name, min, max);
              })
              .join("")
      }
    </div>

    <div class="analytics-card">
      <h3>Goals Today</h3>
      <strong>Completed</strong>
      ${
        appState.goals.filter(g => g.completed).map(g => `<div>✔ ${g.topic}</div>`).join("") || "<p class='muted'>None</p>"
      }
      <br/>
      <strong>Pending</strong>
      ${
        appState.goals.filter(g => !g.completed).map(g => `<div>○ ${g.topic}</div>`).join("") || "<p class='muted'>None</p>"
      }
    </div>
  `;
}

/* ================= WEEKLY ================= */

function renderWeekly() {
  const box = document.getElementById("analyticsContent");
  const weekDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const weekMap = Object.fromEntries(weekDays.map(d => [d, 0]));

  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0,0,0,0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);

  appState.sessions.forEach(s => {
    const t = new Date(s.time);
    if (t >= monday && t <= sunday) {
      const d = t.toLocaleDateString("en-US",{weekday:"short"});
      weekMap[d] += s.minutes;
    }
  });

  const max = Math.max(...Object.values(weekMap), 1);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>This Week</h3>
      ${weekDays.map(d => barRow(d, weekMap[d], max)).join("")}
    </div>
  `;
}

/* ================= YEARLY ================= */

function renderYearly() {
  const box = document.getElementById("analyticsContent");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const year = new Date().getFullYear();
  const map = Object.fromEntries(months.map(m => [m, 0]));

  appState.sessions.forEach(s => {
    const d = new Date(s.time);
    if (d.getFullYear() === year) {
      map[months[d.getMonth()]] += s.minutes;
    }
  });

  const max = Math.max(...Object.values(map), 1);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>${year} Overview</h3>
      ${months.map(m => barRow(m, map[m], max)).join("")}
    </div>
  `;
}

/* ================= HELPERS ================= */

function barRow(label, minutes, max) {
  const pct = Math.round((minutes / max) * 100);
  return `
    <div class="bar-row">
      <span class="bar-label">${label}</span>
      <div class="bar">
        <div class="bar-fill" style="--w:${pct}%"></div>
      </div>
      <span class="bar-value">${minutes}m</span>
    </div>
  `;
}

function capitalize(s){ return s[0].toUpperCase()+s.slice(1); }
