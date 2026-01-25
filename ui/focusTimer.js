// ui/focusTimer.js

import { appState, persistState } from "../state/state.js";
import { renderTodayRing } from "./todayRing.js";
import { renderGoals } from "./renderGoals.js";
import { renderStreaks } from "./streaks.js";

let timer = null;
let seconds = 0;
let activeSubjectId = null;

export function setupFocusTimer() {
  const display = document.getElementById("timerDisplay");
  const select = document.getElementById("timerSubject");

  document.getElementById("startTimer").onclick = () => {
    if (!select.value) {
      alert("Select subject");
      return;
    }

    activeSubjectId = select.value;
    if (timer) return;

    timer = setInterval(() => {
      seconds++;
      display.textContent = format(seconds);
    }, 1000);
  };

  document.getElementById("pauseTimer").onclick = () => {
    clearInterval(timer);
    timer = null;
  };

  document.getElementById("stopTimer").onclick = () => {
    clearInterval(timer);
    timer = null;

    const minutes = Math.floor(seconds / 60);

    if (minutes > 0 && activeSubjectId) {
      // Save session
      appState.sessions.push({
        subjectId: activeSubjectId,
        minutes,
        time: Date.now()
      });

      persistState();

      // 🔥 LIVE UPDATES
      renderTodayRing();
      renderGoals();
      renderStreaks();
    }

    seconds = 0;
    display.textContent = "00:00";
  };
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
