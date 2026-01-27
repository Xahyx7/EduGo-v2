// ui/goals.js

import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";

export function setupGoals() {
  const btn = document.getElementById("addGoalBtn");
  const modal = document.getElementById("goalModal");

  if (!btn || !modal) return;

  // OPEN MODAL
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

  // CANCEL
  document.getElementById("cancelGoal").onclick = () => {
    modal.style.display = "none";
  };

  // SAVE GOAL
  document.getElementById("saveGoal").onclick = () => {
    const subjectId = document.getElementById("goalSubject").value;
    const topic = document.getElementById("goalTopic").value.trim();
    const type = document.getElementById("goalType").value;
    const target = Number(document.getElementById("goalTarget").value);

    if (!subjectId || !topic || target <= 0) return;

    const subjectName =
      appState.subjects.find(s => s.id === subjectId)?.name || "Unknown";

    appState.goals.push({
      id: Date.now().toString(),
      subjectId,
      subjectName,
      topic,
      type,
      target,
      progress: 0,
      completed: false,

      // 🔑 THIS IS THE IMPORTANT PART
      // Used to auto-refresh daily goals
      date: new Date().toDateString()
    });

    persistState();
    modal.style.display = "none";
    renderGoals();
  };
}
