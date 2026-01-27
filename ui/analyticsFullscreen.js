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

  document.getElementById("closeAnalytics").onclick = () =>
    document.getElementById("analyticsOverlay")?.remove();

  document.getElementById("tabDaily").onclick = () => switchTab("daily");
  document.getElementById("tabWeekly").onclick = () => switchTab("weekly");
  document.getElementById("tabYearly").onclick = () => switchTab("yearly");

  renderDaily();
}

function switchTab(tab) {
  document.querySelectorAll(".analytics-tabs button")
    .forEach(b => b.classList.remove("active"));

  document.getElementById(`tab${cap(tab)}`).classList.add("active");

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

  const subjectTime = {};
  sessions.forEach(s => {
    subjectTime[s.subjectId] = (subjectTime[s.subjectId] || 0) + s.minutes;
  });

  const maxTime = Math.max(...Object.values(subjectTime), 1);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>Total Study Today</h3>
      <div class="analytics-big-number">${total} min</div>
    </div>

    <div class="analytics-card">
      <h3>Study by Subject</h3>
      ${
        Object.keys(subjectTime).length === 0
          ? "<p class='muted'>No study yet</p>"
          : Object.entries(subjectTime).map(([id, min]) => {
              const name =
                appState.subjects.find(s => s.id === id)?.name || "Unknown";
              return barRow(name, min, maxTime);
            }).join("")
      }
    </div>

    ${renderGoalAnalytics()}
  `;
}

/* ================= GOAL ANALYTICS ================= */

function renderGoalAnalytics() {
  const subjects = {};

  appState.goals.forEach(g => {
    if (!subjects[g.subjectName]) {
      subjects[g.subjectName] = { completed: 0, pending: 0 };
    }
    g.completed
      ? subjects[g.subjectName].completed++
      : subjects[g.subjectName].pending++;
  });

  const maxGoals = Math.max(
    ...Object.values(subjects).map(v => v.completed + v.pending),
    1
  );

  return `
    <div class="analytics-card">
      <h3>Goals (Today)</h3>
      ${
        Object.keys(subjects).length === 0
          ? "<p class='muted'>No goals yet</p>"
          : Object.entries(subjects).map(([subject, data]) => `
              <div class="goal-analytics-row">
                <strong>${subject}</strong>
                <div class="goal-bars">
                  <div class="goal-bar completed" style="width:${(data.completed / maxGoals) * 100}%">
                    ✔ ${data.completed}
                  </div>
                  <div class="goal-bar pending" style="width:${(data.pending / maxGoals) * 100}%">
                    ○ ${data.pending}
                  </div>
                </div>
              </div>
            `).join("")
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

/* ================= YEARLY (FIXED) ================= */

function renderYearly() {
  const box = document.getElementById("analyticsContent");

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const year = new Date().getFullYear();
  const monthMap = Object.fromEntries(months.map(m => [m, 0]));

  appState.sessions.forEach(s => {
    const d = new Date(s.time);
    if (d.getFullYear() === year) {
      monthMap[months[d.getMonth()]] += s.minutes;
    }
  });

  const max = Math.max(...Object.values(monthMap), 1);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>${year} Overview</h3>
      ${months.map(m => barRow(m, monthMap[m], max)).join("")}
    </div>
  `;
}

/* ================= HELPERS ================= */

function barRow(label, minutes, max) {
  const pct = Math.round((minutes / max) * 100);
  return `
    <div class="bar-row">
      <span>${label}</span>
      <div class="bar">
        <div class="bar-fill" style="--w:${pct}%"></div>
      </div>
      <span>${minutes}m</span>
    </div>
  `;
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
