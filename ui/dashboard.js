// ui/dashboard.js

import { appState } from "../state/state.js";
import { incrementUnit, decrementUnit } from "../state/reducers.js";

export function renderDashboard() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (appState.subjects.length === 0) {
    grid.innerHTML = `<p style="color:white;">No subjects added yet</p>`;
    return;
  }

  appState.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";

    const percent = Math.round(
      (subject.completedUnits / subject.totalUnits) * 100
    );

    card.innerHTML = `
      <h3>${subject.name}</h3>

      <p>Units: ${subject.completedUnits} / ${subject.totalUnits}</p>

      <div class="progress-bar">
        <div class="progress-fill" style="width:${percent}%"></div>
      </div>

      <div class="unit-actions">
        <button class="unit-btn minus">-1</button>
        <button class="unit-btn plus">+1</button>
      </div>
    `;

    // Button actions
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
