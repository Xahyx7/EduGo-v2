// ui/dashboard.js

import { appState, persistState } from "../state/state.js";

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

  appState.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";

    const percent =
      subject.totalUnits === 0
        ? 0
        : Math.round((subject.completedUnits / subject.totalUnits) * 100);

    card.innerHTML = `
      <h3>${subject.name}</h3>
      <p>${subject.completedUnits}/${subject.totalUnits} units (${percent}%)</p>

      <div class="unit-actions">
        <button class="minus">-1</button>
        <button class="plus">+1</button>
      </div>
    `;

    card.querySelector(".plus").onclick = () => {
      if (subject.completedUnits < subject.totalUnits) {
        subject.completedUnits++;
        persistState(); // ✅ SAVE
        renderDashboard();
      }
    };

    card.querySelector(".minus").onclick = () => {
      if (subject.completedUnits > 0) {
        subject.completedUnits--;
        persistState(); // ✅ SAVE
        renderDashboard();
      }
    };

    grid.appendChild(card);
  });
}

function syncTimerSubjects() {
  const select = document.getElementById("timerSubject");
  if (!select) return;

  select.innerHTML = "<option value=''>Select subject</option>";

  appState.subjects.forEach(subject => {
    const opt = document.createElement("option");
    opt.value = subject.id;
    opt.textContent = subject.name;
    select.appendChild(opt);
  });
}
