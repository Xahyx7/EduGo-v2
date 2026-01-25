// ui/focusTimer.js

import { appState } from "../state/state.js";
import { renderTodayRing } from "./todayRing.js";

let timer = null;
let seconds = 0;
let activeSubjectId = null;

export function setupFocusTimer() {
  const start = document.getElementById("startTimer");
  const pause = document.getElementById("pauseTimer");
  const stop = document.getElementById("stopTimer");
  const display = document.getElementById("timerDisplay");
  const select = document.getElementById("timerSubject");

  if (!start || !display) return;

  start.onclick = () => {
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

  pause.onclick = () => {
    clearInterval(timer);
    timer = null;
  };

  stop.onclick = () => {
    clearInterval(timer);
    timer = null;

    if (activeSubjectId && seconds > 0) {
      const minutes = Math.floor(seconds / 60);

      appState.sessions.push({
        subjectId: activeSubjectId,
        minutes,
        time: Date.now()
      });
    }

    seconds = 0;
    display.textContent = "00:00";
    renderTodayRing();
  };
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
