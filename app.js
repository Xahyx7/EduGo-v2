// app.js

import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubject } from "./ui/addSubject.js";
import { setupFocusTimer } from "./ui/focusTimer.js";
import { renderTodayRing } from "./ui/todayRing.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial UI render
  renderDashboard();
  renderTodayRing();

  // Setup interactions
  setupAddSubject();
  setupFocusTimer();
});
