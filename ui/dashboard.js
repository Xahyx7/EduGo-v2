// ui/dashboard.js

import { appState } from "../state/state.js";
import { incrementUnit, decrementUnit } from "../state/reducers.js";

export function renderDashboard() {
  renderSubjects();
  updateTimerSubjects();
}

function renderSubjects() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (appState.subjects.length === 0) {
    grid.innerHTML = `<p style="opacity:0.6">No subjects yet</p>`;
    return;
  }

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

function updateTimerSubjects() {
  const select = document.getElementById("timerSubject");
  if (!select) return;

  select.innerHTML = `<option value="">Select subject</option>`;

  appState.subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    select.appendChild(option);
  });
}
