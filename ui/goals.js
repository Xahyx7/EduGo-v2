// ui/addGoal.js

import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";

export function setupAddGoal() {
  const addBtn = document.getElementById("addGoalBtn");
  const modal = document.getElementById("goalModal");
  const saveBtn = document.getElementById("saveGoal");
  const cancelBtn = document.getElementById("cancelGoal");

  if (!addBtn) return;

  addBtn.onclick = () => {
    populateSubjectSelect();
    modal.style.display = "flex";
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };

  saveBtn.onclick = () => {
    const subjectId = document.getElementById("goalSubject").value;
    const topic = document.getElementById("goalTopic").value;
    const type = document.getElementById("goalType").value;
    const target = Number(document.getElementById("goalTarget").value);

    if (!subjectId || !topic || !target) {
      alert("Fill all fields");
      return;
    }

    const subject = appState.subjects.find(s => s.id === subjectId);
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    appState.goals.push({
      id: crypto.randomUUID(),
      subjectId,
      subjectName: subject.name,
      topic,
      type,
      target,
      progress: 0,
      completed: false,
      createdOn: today
    });

    persistState();
    renderGoals();
    modal.style.display = "none";
  };
}

function populateSubjectSelect() {
  const select = document.getElementById("goalSubject");
  select.innerHTML = "";

  appState.subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name;
    select.appendChild(opt);
  });
}
