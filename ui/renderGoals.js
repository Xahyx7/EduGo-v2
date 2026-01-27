// ui/renderGoals.js

import { appState, persistState } from "../state/state.js";
import { enterFocusMode } from "./focusMode.js";

export function renderGoals() {
  const container = document.getElementById("goalsPreview");
  if (!container) return;

  const today = new Date().toDateString();

  // ONLY today's goals on dashboard
  const todaysGoals = appState.goals.filter(
    g => g.date === today
  );

  container.innerHTML = "";

  if (todaysGoals.length === 0) {
    container.innerHTML = `<p class="muted">No goals for today</p>`;
    return;
  }

  todaysGoals.forEach(goal => {
    const pct = Math.min(
      Math.round((goal.progress / goal.target) * 100),
      100
    );

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
      <div class="goal-header">
        <strong>${goal.subjectName}</strong>
        <span>${goal.topic}</span>
      </div>

      <div class="goal-progress">
        <div class="goal-bar">
          <div class="goal-fill" style="width:${pct}%"></div>
        </div>
        <span>${goal.progress} / ${goal.target}</span>
      </div>

      <div class="goal-actions">
        <button class="focus-btn">Focus</button>
        ${
          goal.completed
            ? `<span class="goal-done">✔ Completed</span>`
            : `<button class="goal-complete">✔</button>`
        }
      </div>
    `;

    // 🔥 RESTORED: FOCUS MODE
    card.querySelector(".focus-btn").onclick = () => {
      enterFocusMode(goal.id);
    };

    // Manual complete
    if (!goal.completed) {
      card.querySelector(".goal-complete").onclick = () => {
        goal.completed = true;
        goal.progress = goal.target;
        persistState();
        renderGoals();
      };
    }

    container.appendChild(card);
  });
}
