// ui/todayRing.js

import { appState } from "../state/state.js";

const DAILY_GOAL = 120;

export function renderTodayRing() {
  const circle = document.getElementById("todayRingProgress");
  const label = document.getElementById("todayRingLabel");

  const today = new Date().toDateString();
  const mins = appState.sessions
    .filter(s => new Date(s.time).toDateString() === today)
    .reduce((a, b) => a + b.minutes, 0);

  const r = 52;
  const c = 2 * Math.PI * r;
  circle.style.strokeDasharray = c;
  circle.style.strokeDashoffset = c * (1 - Math.min(mins / DAILY_GOAL, 1));

  label.textContent = `${mins} min`;
}
