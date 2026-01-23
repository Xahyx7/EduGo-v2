// ui/addSubject.js

import { appState } from "../state/state.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubject() {
  const addBtn = document.getElementById("addSubjectBtn");
  const modal = document.getElementById("subjectModal");
  const cancelBtn = document.getElementById("cancelModal");
  const saveBtn = document.getElementById("saveSubject");

  if (!addBtn || !modal) return;

  addBtn.onclick = () => {
    modal.style.display = "flex";
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
  };

  saveBtn.onclick = () => {
    const nameInput = document.getElementById("subjectName");
    const unitsInput = document.getElementById("subjectUnits");

    const name = nameInput.value.trim();
    const units = Number(unitsInput.value);

    if (!name || units <= 0) {
      alert("Enter subject name and units");
      return;
    }

    appState.subjects.push({
      id: Date.now().toString(),
      name,
      totalUnits: units,
      completedUnits: 0,
      timeSpent: 0
    });

    // reset inputs
    nameInput.value = "";
    unitsInput.value = "";

    modal.style.display = "none";
    renderDashboard(); // 🔥 THIS IS CRITICAL
  };
}
