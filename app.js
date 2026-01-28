// app.js

import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubject } from "./ui/addSubject.js";
import { setupFocusTimer } from "./ui/focusTimer.js";
import { renderTodayRing } from "./ui/todayRing.js";
import { setupGoals } from "./ui/goals.js";
import { renderGoals } from "./ui/renderGoals.js";
import { setupDailyAnalyticsCard } from "./ui/analyticsCard.js";
import { renderStreaks } from "./ui/streaks.js";
import { setupSettings } from "./ui/settings.js";

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();
  renderGoals();
  renderTodayRing();
  renderStreaks();

  setupAddSubject();
  setupGoals();
  setupFocusTimer();
  setupDailyAnalyticsCard();
  setupSettings();
});
