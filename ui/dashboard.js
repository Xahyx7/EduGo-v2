// ui/dashboard.js

import { appState } from "../state/state.js";
import { incrementUnit, decrementUnit } from "../state/reducers.js";

export function renderDashboard() {
  const grid = document.getElementById("subjectGrid");
  if (!grid) return;

  // Clear dashboard
  grid.innerHTML = "";

  // ---------- UPDATE TIMER SUBJECT DROPDOWN ----------
  const subjectSelect = document.getElementById("timerSubject");
  if (subjectSelect) {
    subjectSelect.innerHTML = `<option value="">Select Subject</option>`;

    appState.subjects.forEach(subject => {
      const option = document.createElement("option");
      option.value = subject.id;
      option.textContent = subject.name;
      subjectSelect.appendChild(option);
    });
  }

  // ---------- NO SUBJECT CASE ----------
  if (appState.subjects.length === 0) {
    grid.innerHTML = `<p style="color:white;">No subjects added yet</p>`;
    return;
  }

  // ---------- RENDER SUBJECT CARDS ----------
  appState.subjects.forEach(subject => {
    const card = document.createElement("div");
    card.className = "subject-card";

    const percent = Math.round(
      (subject.completedUnits / subject.totalUnits) * 100
    );

   const unitPercent = Math.min(
  subject.completedUnits / subject.totalUnits,
  1
);

const radius = 24;
const circumference = 2 * Math.PI * radius;
const offset = circumference * (1 - unitPercent);

card.innerHTML = `
  <div class="subject-top">
    <h3>${subject.name}</h3>

    <svg class="mini-ring" width="64" height="64">
      <circle
        cx="32"
        cy="32"
        r="${radius}"
        stroke="rgba(255,255,255,0.15)"
        stroke-width="6"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="${radius}"
        stroke="#22d3ee"
        stroke-width="6"
        fill="none"
        stroke-linecap="round"
        stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"
        transform="rotate(-90 32 32)"
      />
    </svg>
  </div>

  <p class="subject-meta">
    ${subject.completedUnits}/${subject.totalUnits} units • ${subject.timeSpent} min
  </p>

  <div class="unit-actions">
    <button class="unit-btn minus">-1</button>
    <button class="unit-btn plus">+1</button>
  </div>
`;


    // +1 unit
    card.querySelector(".plus").onclick = () => {
      incrementUnit(subject.id);
      renderDashboard();
    };

    // -1 unit
    card.querySelector(".minus").onclick = () => {
      decrementUnit(subject.id);
      renderDashboard();
    };

    grid.appendChild(card);
  });
}
export function renderGoalsPreview() {
  const container = document.getElementById("goalsPreview");
  if (!container) return;

  container.innerHTML = "";

  const goals = appState.goals.filter(g => !g.completed);

  if (goals.length === 0) {
    container.innerHTML = `<p style="opacity:0.6">No goals for today</p>`;
    return;
  }

  goals.forEach(goal => {
    const card = document.createElement("div");
    card.className = "goal-card";

    const percent = Math.min(goal.progress / goal.target, 1) * 100;

    card.innerHTML = `
      <div class="goal-header">
        <span class="goal-subject">${goal.subjectName}</span>
        <span class="goal-topic">${goal.topic}</span>
      </div>

      <div class="goal-progress">
        <div class="goal-bar">
          <div class="goal-fill" style="width:${percent}%"></div>
        </div>
        <span class="goal-text">
          ${goal.progress}/${goal.target} ${goal.type === "time" ? "min" : "units"}
        </span>
      </div>
    `;

    container.appendChild(card);
  });
}
