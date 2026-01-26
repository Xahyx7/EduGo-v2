// ui/goals.js

import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";

export function setupGoals() {
  const btn = document.getElementById("addGoalBtn");
  const modal = document.getElementById("goalModal");

  btn.onclick = () => {
    const sel = document.getElementById("goalSubject");
    sel.innerHTML = "";

    appState.subjects.forEach(s => {
      const o = document.createElement("option");
      o.value = s.id;
      o.textContent = s.name;
      sel.appendChild(o);
    });

    modal.style.display = "block";
  };

  document.getElementById("cancelGoal").onclick = () => {
    modal.style.display = "none";
  };

  document.getElementById("saveGoal").onclick = () => {
    const subjectId = document.getElementById("goalSubject").value;
    const topic = document.getElementById("goalTopic").value;
    const type = document.getElementById("goalType").value;
    const target = Number(document.getElementById("goalTarget").value);

    if (!topic || target <= 0) return;

    const subjectName =
      appState.subjects.find(s => s.id === subjectId)?.name;

    // 🔑 ADD TODAY TAG (SAFE)
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    appState.goals.push({
      id: Date.now().toString(),
      subjectId,
      subjectName,
      topic,
      type,
      target,
      progress: 0,
      completed: false,
      createdOn: today
    });

    persistState();
    modal.style.display = "none";
    renderGoals();
  };
}
