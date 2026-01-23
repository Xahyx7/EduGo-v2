// state/selectors.js

import { appState } from "./state.js";

// Minutes studied today
export function getTodayMinutes() {
  const today = new Date().toDateString();

  return appState.sessions
    .filter(s => new Date(s.time).toDateString() === today)
    .reduce((sum, s) => sum + s.minutes, 0);
}

// Minutes studied in last 7 days
export function getWeekMinutes() {
  const now = Date.now();
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

  return appState.sessions
    .filter(s => s.time >= weekAgo)
    .reduce((sum, s) => sum + s.minutes, 0);
}
