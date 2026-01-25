// ui/// ui/goals.js

import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";

export function setupGoals() {
  const btn = document.getElementById("addGoalBtn");
  const modal = document.getElementById("goalModal");

  const subjectSelect = document.getElementById("goalSubject");
  const topicInput = document.getElementById("goalTopic");
  const typeSelect = document.getElementById("goalType");
  const targetInput = document.getElementById("goalTarget");

  btn.onclick = () => {
    subjectSelect.innerHTML = "";
    appState.subjects.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name;
      subjectSelect.appendChild(opt);
    });

    modal.style.display = "block";
  };

  document.getElementById("cancelGoal").onclick = () => {
    modal.style.display = "none";
  };

  document.getElementById("saveGoal").onclick = () => {
    const subjectId = subjectSelect.value;
    const subjectName =
      appState.subjects.find(s => s.id === subjectId)?.name;

    const topic = topicInput.value.trim();
    const type = typeSelect.value;
    const target = Number(targetInput.value);

    if (!subjectId || !topic || target <= 0) {
      alert("Fill all fields");
      return;
    }

    appState.goals.push({
      id: Date.now().toString(),
      subjectId,
      subjectName,
      topic,
      type,
      target,
      progress: 0,
      completed: false
    });

    persistState();
    modal.style.display = "none";
    topicInput.value = "";
    targetInput.value = "";

    renderGoals();
  };
}


import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";

export function setupGoals() {
  const btn = document.getElementById("addGoalBtn");
  const modal = document.getElementById("goalModal");

  const subjectSelect = document.getElementById("goalSubject");
  const topicInput = document.getElementById("goalTopic");
  const typeSelect = document.getElementById("goalType");
  const targetInput = document.getElementById("goalTarget");

  btn.onclick = () => {
    subjectSelect.innerHTML = "";
    appState.subjects.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = s.name;
      subjectSelect.appendChild(opt);
    });

    modal.style.display = "block";
  };

  document.getElementById("cancelGoal").onclick = () => {
    modal.style.display = "none";
  };

  document.getElementById("saveGoal").onclick = () => {
    const subjectId = subjectSelect.value;
    const subjectName =
      appState.subjects.find(s => s.id === subjectId)?.name;

    const topic = topicInput.value.trim();
    const type = typeSelect.value;
    const target = Number(targetInput.value);

    if (!subjectId || !topic || target <= 0) {
      alert("Fill all fields");
      return;
    }

    appState.goals.push({
      id: Date.now().toString(),
      subjectId,
      subjectName,
      topic,
      type,
      target,
      progress: 0,
      completed: false
    });

    persistState();
    modal.style.display = "none";
    topicInput.value = "";
    targetInput.value = "";

    renderGoals();
  };
}
