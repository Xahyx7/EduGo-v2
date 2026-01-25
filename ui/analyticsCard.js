// ui/analyticsCard.js

import { appState } from "../state/state.js";

export function setupDailyAnalyticsCard() {
  const selector = document.getElementById("dailyAnalyticsMode");
  const content = document.getElementById("dailyAnalyticsContent");

  if (!selector || !content) return;

  selector.onchange = () => renderDailyAnalytics(selector.value);
  renderDailyAnalytics(selector.value);
}

export function renderDailyAnalytics(mode) {
  const content = document.getElementById("dailyAnalyticsContent");
  if (!content) return;

  const today = new Date().toDateString();

  const todaysSessions = appState.sessions.filter(
    s => new Date(s.time).toDateString() === today
  );

  if (mode === "overall") {
    const total = todaysSessions.reduce((a, b) => a + b.minutes, 0);
    content.innerHTML = `<h2>${total} min</h2><p>studied today</p>`;
  }

  if (mode === "subject") {
    const map = {};
    todaysSessions.forEach(s => {
      map[s.subjectId] = (map[s.subjectId] || 0) + s.minutes;
    });

    content.innerHTML = Object.entries(map).map(([id, min]) => {
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
    }).join("") || "<p>No study yet</p>";
  }

  if (mode === "goal") {
    const completed = appState.goals.filter(g => g.completed);
    const pending = appState.goals.filter(g => !g.completed);

    content.innerHTML = `
      <strong>Completed</strong>
      ${completed.map(g => `<div>✔ ${g.topic}</div>`).join("") || "<p>None</p>"}
      <br/>
      <strong>Pending</strong>
      ${pending.map(g => `<div>○ ${g.topic}</div>`).join("") || "<p>None</p>"}
    `;
  }
}
