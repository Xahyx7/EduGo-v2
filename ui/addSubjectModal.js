// ui/addSubjectModal.js

import { addSubject } from "../state/reducers.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubjectModal() {
  const openBtn = document.getElementById("addSubjectBtn");
  const modal = document.getElementById("subjectModal");
  const cancelBtn = document.getElementById("cancelModal");
  const saveBtn = document.getElementById("saveSubject");

  const nameInput = document.getElementById("subjectName");
  const unitsInput = document.getElementById("subjectUnits");

  if (!openBtn || !modal) return;

  openBtn.onclick = () => {
    modal.style.display = "flex";
  };

  cancelBtn.onclick = () => {
    modal.style.display = "none";
    clearInputs();
  };

  saveBtn.onclick = () => {
    const name = nameInput.value.trim();
    const units = Number(unitsInput.value);

    if (!name || !units || units <= 0) {
      alert("Please enter valid details");
      return;
    }

    addSubject({
      name,
      totalUnits: units,
      completedUnits: 0,
      timeSpent: 0
    });

    modal.style.display = "none";
    clearInputs();
    renderDashboard();
  };

  function clearInputs() {
    nameInput.value = "";
    unitsInput.value = "";
  }
}
