// ui/addSubject.js

import { addSubject } from "../state/reducers.js";
import { renderDashboard } from "./dashboard.js";

export function setupAddSubject() {
  const btn = document.getElementById("addSubjectBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const name = prompt("Enter subject name:");
    if (!name) return;

    const totalUnits = prompt("Enter total units:");
    if (!totalUnits || isNaN(totalUnits)) return;

    addSubject({
      name,
      totalUnits: Number(totalUnits),
      completedUnits: 0,
      timeSpent: 0
    });

    renderDashboard();
  });
}
