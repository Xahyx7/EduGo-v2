// ui/dashboard.js

import { appState } from "../state/state.js";

export function renderDashboard() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  appState.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";

    const percent =
      subject.totalUnits === 0
        ? 0
        : Math.round((subject.completedUnits / subject.totalUnits) * 100);

    card.innerHTML = `
      <div class="subject-top">
        <h3>${subject.name}</h3>
        <div class="mini-ring-text">${percent}%</div>
      </div>

      <p class="subject-meta">
        ${subject.completedUnits}/${subject.totalUnits} units • ${subject.timeSpent} min
      </p>

      <div class="unit-actions">
        <button>-1</button>
        <button>+1</button>
      </div>
    `;

    grid.appendChild(card);
  });

  renderGoalsPreview();
}

export function renderGoalsPreview() {
  const container = document.getElementById("goalsPreview");
  if (!container) return;

  container.innerHTML = "";

  const goals = Array.isArray(appState.goals) ? appState.goals : [];

  if (goals.length === 0) {
    container.innerHTML = `<p style="opacity:0.6">No goals for today</p>`;
    return;
  }

  goals.forEach(goal => {
    const percent = Math.min(goal.progress / goal.target, 1) * 100;

    const card = document.createElement("div");
    card.className = "goal-card";

    card.innerHTML = `
      <div class="goal-header">
        <strong>${goal.subjectName}</strong>
        <span>${goal.topic}</span>
      </div>

      <div class="goal-bar">
        <div class="goal-fill" style="width:${percent}%"></div>
      </div>

      <div class="goal-text">
        ${goal.progress}/${goal.target} ${goal.type === "time" ? "min" : "units"}
      </div>
    `;

    container.appendChild(card);
  });
}
