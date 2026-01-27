// ui/renderGoals.js

import { appState, persistState } from "../state/state.js";

export function renderGoals() {
  const container = document.getElementById("goalsPreview");
  if (!container) return;

  const today = new Date().toDateString();

  const todaysGoals = appState.goals.filter(
    g => g.date === today
  );

  if (todaysGoals.length === 0) {
    container.innerHTML = `<p class="muted">No goals for today</p>`;
    return;
  }

  container.innerHTML = "";

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
        ${
          goal.completed
            ? `<span class="goal-done">✔ Completed</span>`
            : `<button class="goal-complete">✔</button>`
        }
      </div>
    `;

    if (!goal.completed) {
      card.querySelector(".goal-complete").onclick = () => {
        goal.completed = true;
        persistState();
        renderGoals();
      };
    }

    container.appendChild(card);
  });
}
