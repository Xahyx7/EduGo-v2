// ui/renderGoals.js

import { appState } from "../state/state.js";

export function renderGoals() {
  const box = document.getElementById("goalsPreview");
  box.innerHTML = "";

  appState.goals.forEach(g => {
    const d = document.createElement("div");
    d.className = "goal-card";
    d.innerHTML = `
      <strong>${g.subjectName}</strong>
      <div>${g.topic}</div>
      <div>${g.progress}/${g.target} ${g.type}</div>
    `;
    box.appendChild(d);
  });
}
