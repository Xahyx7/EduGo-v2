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
              const name = appState.subjects.find(s => s.id === id)?.name || "Unknown";
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
          : Object.entries(subjects).map(([subject, data]) => {
              const total = data.completed + data.pending;
              return `
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
              `;
            }).join("")
      }
    </div>
  `;
}

/* ================= WEEKLY (UNCHANGED) ================= */

function renderWeekly() {
  const box = document.getElementById("analyticsContent");
  box.innerHTML = `<p class="muted">Weekly analytics already implemented</p>`;
}

/* ================= YEARLY (UNCHANGED) ================= */

function renderYearly() {
  const box = document.getElementById("analyticsContent");
  box.innerHTML = `<p class="muted">Yearly analytics already implemented</p>`;
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
