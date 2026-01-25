// ui/todayRing.js

import { appState } from "../state/state.js";

const DAILY_GOAL_MINUTES = 120; // you can change later

export function renderTodayRing() {
  const circle = document.getElementById("todayRingProgress");
  const label = document.getElementById("todayRingLabel");

  if (!circle || !label) return;

  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  const today = new Date().toDateString();

  const minutes = appState.sessions
    .filter(s => new Date(s.time).toDateString() === today)
    .reduce((sum, s) => sum + s.minutes, 0);

  const percent = Math.min(minutes / DAILY_GOAL_MINUTES, 1);
  const offset = circumference * (1 - percent);

  circle.style.strokeDasharray = circumference;
  circle.style.strokeDashoffset = offset;

  label.textContent = `${minutes} min`;
}
