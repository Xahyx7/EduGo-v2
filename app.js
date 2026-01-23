// app.js

import { renderDashboard } from "./ui/dashboard.js";
import { setupFocusTimer } from "./ui/focusTimer.js";
import { setupFocusMode } from "./ui/focusMode.js";
import { setupAddSubject } from "./ui/addSubject.js";
import { renderTodayRing } from "./ui/todayRing.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initial render
  renderDashboard();
  renderTodayRing();

  // Setup interactions
  setupFocusTimer();
  setupFocusMode();
  setupAddSubject();
});
