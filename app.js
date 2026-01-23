// app.js

import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubject } from "./ui/addSubject.js";
import { setupFocusTimer } from "./ui/focusTimer.js";
import { setupFocusMode } from "./ui/focusMode.js";
import { renderTodayRing } from "./ui/todayRing.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();      // render UI
  renderTodayRing();     // render ring

  setupAddSubject();     // add subject modal
  setupFocusTimer();     // timer buttons
  setupFocusMode();      // focus mode
});
