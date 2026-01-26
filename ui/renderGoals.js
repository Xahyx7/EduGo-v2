// ui/renderGoals.js

import { appState } from "../state/state.js";
import { enterFocusMode } from "./focusMode.js";

export function renderGoals() {
  const container = document.getElementById("goalsPreview");
  if (!container) return;

  const today = new Date().toISOString().slice(0, 10);

  const todaysGoals = appState.goals.filter(
    g => g.createdOn === today
  );

  container.innerHTML = "";

  if (todaysGoals.length === 0) {
    container.innerHTML = `<p class="muted">No goals for today</p>`;
    return;
  }

  todaysGoals.forEach(goal => {
    const pct = Math.round((goal.progress / goal.target) * 100);

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
      <h4>${goal.topic}</h4>
      <p>${goal.subjectName}</p>

      <div class="goal-bar">
        <div class="goal-fill" style="width:${pct}%"></div>
      </div>

      <div class="goal-actions">
        <button class="focus-btn">Focus</button>
        ${
          goal.completed
            ? "<span class='done'>✔</span>"
            : "<button class='done-btn'>✔</button>"
        }
      </div>
    `;

    card.querySelector(".focus-btn").onclick = () =>
      enterFocusMode(goal.id);

    if (!goal.completed) {
      card.querySelector(".done-btn").onclick = () => {
        goal.completed = true;
        goal.progress = goal.target;
        renderGoals();
      };
    }

    container.appendChild(card);
  });
}
