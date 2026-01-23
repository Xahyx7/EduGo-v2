// ui/dashboard.js

import { appState } from "../state/state.js";
import { incrementUnit, decrementUnit } from "../state/reducers.js";

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
        <button class="minus">-1</button>
        <button class="plus">+1</button>
      </div>
    `;

    card.querySelector(".plus").onclick = () => {
      incrementUnit(subject.id);
      renderDashboard();
    };

    card.querySelector(".minus").onclick = () => {
      decrementUnit(subject.id);
      renderDashboard();
    };

    grid.appendChild(card);
  });
}
