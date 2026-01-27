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
    document.getElementById("analyticsOverlay").remove();

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

  const subjectMap = {};
  sessions.forEach(s => {
    subjectMap[s.subjectId] = (subjectMap[s.subjectId] || 0) + s.minutes;
  });

  const goals = appState.goals.filter(g => g.date === today);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>Total Study Today</h3>
      <div class="analytics-big-number">${total} min</div>
    </div>

    <div class="analytics-card">
      <h3>Study by Subject</h3>
      ${
        Object.keys(subjectMap).length === 0
          ? "<p class='muted'>No study yet</p>"
          : Object.entries(subjectMap).map(([id, min]) => {
              const name =
                appState.subjects.find(s => s.id === id)?.name || "Unknown";
              return barRow(name, min, Math.max(...Object.values(subjectMap), 1));
            }).join("")
      }
    </div>

    <div class="analytics-card">
      <h3>Goals (Today)</h3>
      ${
        goals.length === 0
          ? "<p class='muted'>No goals</p>"
          : goals.map(g => `
              <div class="goal-analytics-row">
                <span>${g.topic}</span>
                <span>${g.completed ? "✔" : "○"}</span>
              </div>
            `).join("")
      }
    </div>
  `;
}

/* ================= WEEKLY ================= */

function renderWeekly() {
  const box = document.getElementById("analyticsContent");

  const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const map = Object.fromEntries(days.map(d => [d, 0]));

  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  monday.setHours(0,0,0,0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23,59,59,999);

  appState.sessions.forEach(s => {
    const t = new Date(s.time);
