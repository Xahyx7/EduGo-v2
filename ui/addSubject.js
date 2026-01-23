// ui/addSubject.js

import { appState } from "../state/state.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubject() {
  const btn = document.getElementById("addSubjectBtn");
  const modal = document.getElementById("subjectModal");

  btn.onclick = () => modal.style.display = "block";

  document.getElementById("cancelModal").onclick = () =>
    modal.style.display = "none";

  document.getElementById("saveSubject").onclick = () => {
    const name = document.getElementById("subjectName").value;
    const units = Number(document.getElementById("subjectUnits").value);

    appState.subjects.push({
      id: Date.now().toString(),
      name,
      totalUnits: units,
      completedUnits: 0
    });

    modal.style.display = "none";
    renderDashboard();
  };
}
