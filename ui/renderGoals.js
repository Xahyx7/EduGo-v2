// ui/renderGoals.js

import { appState } from "../state/state.js";

export function renderGoals() {
  const box = document.getElementById("goalsPreview");
  box.innerHTML = "";

  if (appState.goals.length === 0) {
    box.innerHTML = "<p>No goals yet</p>";
    return;
  }

  appState.goals.forEach(goal => {
    const percent = Math.min(goal.progress / goal.target, 1) * 100;

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
      <strong>${goal.subjectName}</strong>
      <div>${goal.topic}</div>

      <div class="goal-bar">
        <div class="goal-fill" style="width:${percent}%"></div>
      </div>

      <div>
        ${goal.progress}/${goal.target} ${goal.type}
        ${goal.completed ? " ✅" : ""}
      </div>
    `;

    if (goal.completed) {
      card.style.opacity = "0.6";
    }

    box.appendChild(card);
  });
}
