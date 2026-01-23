// ui/todayRing.js

import { appState } from "../state/state.js";
import { getTodayMinutes } from "../state/selectors.js";

export function renderTodayRing() {
  const circle = document.getElementById("todayRingProgress");
  const label = document.getElementById("todayRingLabel");

  if (!circle || !label) return;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  const today = getTodayMinutes();
  const goal = appState.goals.dailyMinutes || 60;

  const percent = Math.min(today / goal, 1);
  const offset = circumference * (1 - percent);

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;

  label.textContent = `${Math.round(percent * 100)}%`;
}
