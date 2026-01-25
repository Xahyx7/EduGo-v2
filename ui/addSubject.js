// ui/addSubject.js

import { appState, persistState } from "../state/state.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubject() {
  const btn = document.getElementById("addSubjectBtn");
  const modal = document.getElementById("subjectModal");

  btn.onclick = () => (modal.style.display = "block");

  document.getElementById("cancelModal").onclick = () =>
    (modal.style.display = "none");

  document.getElementById("saveSubject").onclick = () => {
    const name = document.getElementById("subjectName").value.trim();
    const units = Number(document.getElementById("subjectUnits").value);

    if (!name || units <= 0) return;

    appState.subjects.push({
      id: Date.now().toString(),
      name,
      totalUnits: units,
      completedUnits: 0,
      timeSpent: 0
    });

    persistState(); // ✅ SAVE

    modal.style.display = "none";
    renderDashboard();
  };
}
