// ui/analyticsCard.js

import { appState } from "../state/state.js";
import { openAnalyticsFullscreen } from "./analyticsFullscreen.js";

export function setupDailyAnalyticsCard() {
  const selector = document.getElementById("dailyAnalyticsMode");
  const content = document.getElementById("dailyAnalyticsContent");
  const openBtn = document.getElementById("openAnalytics");

  if (!selector || !content) return;

  selector.onchange = () => renderDailyAnalytics(selector.value);
  renderDailyAnalytics(selector.value);

  openBtn.onclick = openAnalyticsFullscreen;
}

function renderDailyAnalytics(mode) {
  const content = document.getElementById("dailyAnalyticsContent");
  const today = new Date().toDateString();

  const sessions = appState.sessions.filter(
    s => new Date(s.time).toDateString() === today
  );

  if (mode === "overall") {
    const total = sessions.reduce((a, b) => a + b.minutes, 0);
    content.innerHTML = `<h2>${total} min</h2><p>today</p>`;
  }

  if (mode === "subject") {
    const map = {};
    sessions.forEach(s => {
      map[s.subjectId] = (map[s.subjectId] || 0) + s.minutes;
    });

    content.innerHTML =
      Object.entries(map).map(([id, min]) => {
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

  // ✅ FIX: ONLY TODAY'S GOALS
  if (mode === "goal") {
    const todaysGoals = appState.goals.filter(
      g => g.date === today
    );

    content.innerHTML = `
      <strong>Completed</strong>
      ${
        todaysGoals.filter(g => g.completed)
          .map(g => `<div>✔ ${g.topic}</div>`)
          .join("") || "<p>None</p>"
      }
      <br />
      <strong>Pending</strong>
      ${
        todaysGoals.filter(g => !g.completed)
          .map(g => `<div>○ ${g.topic}</div>`)
          .join("") || "<p>None</p>"
      }
    `;
  }
}
