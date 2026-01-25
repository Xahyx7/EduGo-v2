// ui/dashboard.js

import { appState, persistState } from "../state/state.js";

export function renderDashboard() {
  renderSubjects();
  syncTimerSubjects();
}

function renderSubjects() {
  const grid = document.getElementById("subjectGrid");
  grid.innerHTML = "";

  if (appState.subjects.length === 0) {
    grid.innerHTML = "<p>No subjects yet</p>";
    return;
  }

  appState.subjects.forEach(s => {
    const div = document.createElement("div");
    div.className = "subject-card";

    div.innerHTML = `
      <h3>${s.name}</h3>
      <p>${s.completedUnits}/${s.totalUnits} units</p>
      <button class="minus">-</button>
      <button class="plus">+</button>
    `;

    div.querySelector(".plus").onclick = () => {
      if (s.completedUnits < s.totalUnits) {
        s.completedUnits++;
        persistState();
        renderDashboard();
      }
    };

    div.querySelector(".minus").onclick = () => {
      if (s.completedUnits > 0) {
        s.completedUnits--;
        persistState();
        renderDashboard();
      }
    };

    grid.appendChild(div);
  });
}

function syncTimerSubjects() {
  const select = document.getElementById("timerSubject");
  select.innerHTML = "<option value=''>Select subject</option>";

  appState.subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
}
