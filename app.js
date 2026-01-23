// app.js

import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubject } from "./ui/addSubject.js";
import { setupFocusTimer } from "./ui/focusTimer.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  setupAddSubject();
  setupFocusTimer();
});
