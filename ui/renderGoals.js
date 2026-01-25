// ui/renderGoals.js

import { appState, persistState } from "../state/state.js";
import { enterFocusMode } from "./focusMode.js";

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
      <div class="goal-header">
        <strong>${goal.subjectName}</strong>
        <div>
          <button class="goal-focus">🎯</button>
          <button class="goal-check">${goal.completed ? "✔" : "○"}</button>
        </div>
      </div>

      <div class="goal-topic">${goal.topic}</div>

      <div class="goal-bar">
        <div class="goal-fill" style="width:${percent}%"></div>
      </div>

      <div class="goal-text">
        ${goal.progress}/${goal.target} ${goal.type}
      </div>
    `;

    // Manual completion
    card.querySelector(".goal-check").onclick = () => {
      goal.completed = !goal.completed;
      if (goal.completed) goal.progress = goal.target;
      persistState();
      renderGoals();
    };

    // 🔥 ENTER FOCUS MODE
    card.querySelector(".goal-focus").onclick = () => {
      enterFocusMode(goal.id);
    };

    if (goal.completed) card.classList.add("goal-completed");

    box.appendChild(card);
  });
}
