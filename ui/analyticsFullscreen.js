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
          <button class="active">Daily</button>
          <button disabled>Weekly</button>
          <button disabled>Yearly</button>
        </nav>

        <section id="analyticsDaily" class="analytics-content"></section>

      </div>
    </div>
    `
  );

  document.getElementById("closeAnalytics").onclick = closeAnalyticsFullscreen;

  renderDailyAnalyticsFullscreen();
}

function closeAnalyticsFullscreen() {
  document.getElementById("analyticsOverlay")?.remove();
}

function renderDailyAnalyticsFullscreen() {
  const box = document.getElementById("analyticsDaily");
  if (!box) return;

  const today = new Date().toDateString();

  const sessions = appState.sessions.filter(
    s => new Date(s.time).toDateString() === today
  );

  const total = sessions.reduce((a, b) => a + b.minutes, 0);

  // Subject breakdown
  const subjectMap = {};
  sessions.forEach(s => {
    subjectMap[s.subjectId] = (subjectMap[s.subjectId] || 0) + s.minutes;
  });

  // Goals
  const completedGoals = appState.goals.filter(g => g.completed);
  const pendingGoals = appState.goals.filter(g => !g.completed);

  box.innerHTML = `
    <div class="analytics-card big">
      <h3>Total Study Today</h3>
      <div class="analytics-big-number">${total} min</div>
    </div>

    <div class="analytics-card">
      <h3>By Subject</h3>
      ${
        Object.keys(subjectMap).length === 0
          ? "<p>No study yet</p>"
          : Object.entries(subjectMap).map(([id, min]) => {
              const name =
                appState.subjects.find(s => s.id === id)?.name || "Unknown";
              return `
                <div class="bar-row">
                  <span>${name}</span>
                  <div class="bar">
                    <div class="bar-fill" style="width:${min * 3}px"></div>
                  </div>
                  <span>${min}m</span>
                </div>
              `;
            }).join("")
      }
    </div>

    <div class="analytics-card">
      <h3>Goals Today</h3>

      <strong>Completed</strong>
      ${completedGoals.map(g => `<div>✔ ${g.topic}</div>`).join("") || "<p>None</p>"}

      <br />

      <strong>Pending</strong>
      ${pendingGoals.map(g => `<div>○ ${g.topic}</div>`).join("") || "<p>None</p>"}
    </div>
  `;
}
