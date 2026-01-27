// ui/streaks.js

import { appState } from "../state/state.js";

const MINUTES_REQUIRED = 60;

export function renderStreaks() {
  const currentEl = document.getElementById("currentStreak");
  const longestEl = document.getElementById("longestStreak");

  if (!currentEl || !longestEl) return;

  const dayTotals = {};

  // Sum minutes per day
  appState.sessions.forEach(s => {
    const day = new Date(s.time).toDateString();
    dayTotals[day] = (dayTotals[day] || 0) + s.minutes;
  });

  /* ================= LONGEST STREAK (UNCHANGED) ================= */

  const validDays = Object.keys(dayTotals)
    .filter(d => dayTotals[d] >= MINUTES_REQUIRED)
    .map(d => new Date(d))
    .sort((a, b) => a - b);

  let longest = 0;
  let temp = 0;

  for (let i = 0; i < validDays.length; i++) {
    if (i === 0) {
      temp = 1;
    } else {
      const diff =
        (validDays[i] - validDays[i - 1]) / (1000 * 60 * 60 * 24);

      temp = diff === 1 ? temp + 1 : 1;
    }
    longest = Math.max(longest, temp);
  }

  /* ================= CURRENT STREAK (FIXED PROPERLY) ================= */

  let current = 0;
  const today = new Date();
  const todayKey = today.toDateString();

  // ✅ If today already qualifies, count it
  if (dayTotals[todayKey] >= MINUTES_REQUIRED) {
    current = 1;
    today.setDate(today.getDate() - 1);
  } else {
    // Otherwise start from yesterday
    today.setDate(today.getDate() - 1);
  }

  // Continue checking backwards
  while (dayTotals[today.toDateString()] >= MINUTES_REQUIRED) {
    current++;
    today.setDate(today.getDate() - 1);
  }

  currentEl.textContent = current;
  longestEl.textContent = longest;
}
