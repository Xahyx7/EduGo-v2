// app/ui/dashboard.js

import { appState } from "../state/state.js";

export function renderDashboard() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  // If no subjects exist
  if (appState.subjects.length === 0) {
    grid.innerHTML = `<p style="color:white;">No subjects added yet</p>`;
    return;
  }

  // Render subject cards
  appState.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
      <h3>${subject.name}</h3>
      <p>Units: ${subject.completedUnits} / ${subject.totalUnits}</p>
      <p>Time studied: ${subject.timeSpent} min</p>
    `;

    grid.appendChild(card);
  });
}
