// ui/dashboard.js

import { appState } from "../state/state.js";

export function renderDashboard() {
  renderSubjects();
  syncTimerSubjects();
}

function renderSubjects() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (appState.subjects.length === 0) {
    grid.innerHTML = "<p>No subjects added yet</p>";
    return;
  }

  appState.subjects.forEach(s => {
    const div = document.createElement("div");
    div.className = "subject-card";
    div.textContent = `${s.name} (${s.completedUnits}/${s.totalUnits})`;
    grid.appendChild(div);
  });
}

function syncTimerSubjects() {
  const select = document.getElementById("timerSubject");
  if (!select) return;

  select.innerHTML = "<option value=''>Select subject</option>";

  appState.subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
}
