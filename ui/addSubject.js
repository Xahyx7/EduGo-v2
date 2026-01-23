// ui/addSubject.js

import { appState } from "../state/state.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubject() {
  const addBtn = document.getElementById("addSubjectBtn");
  const modal = document.getElementById("subjectModal");
  const cancelBtn = document.getElementById("cancelModal");
  const saveBtn = document.getElementById("saveSubject");

  if (!addBtn) return;

  addBtn.onclick = () => {
    modal.style.display = "flex";
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };

  saveBtn.onclick = () => {
    const name = document.getElementById("subjectName").value.trim();
    const units = Number(document.getElementById("subjectUnits").value);

    if (!name || !units) return;

    appState.subjects.push({
      id: Date.now().toString(),
      name,
      totalUnits: units,
      completedUnits: 0,
      timeSpent: 0
    });

    modal.style.display = "none";
    renderDashboard();
  };
}
