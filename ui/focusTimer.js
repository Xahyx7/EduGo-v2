// ui/focusTimer.js

import { appState, persistState } from "../state/state.js";
import { renderTodayRing } from "./todayRing.js";

let timer = null;
let seconds = 0;
let subjectId = null;

export function setupFocusTimer() {
  const display = document.getElementById("timerDisplay");
  const select = document.getElementById("timerSubject");

  document.getElementById("startTimer").onclick = () => {
    if (!select.value) return alert("Select subject");
    subjectId = select.value;
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

    if (seconds > 0) {
      appState.sessions.push({
        subjectId,
        minutes: Math.floor(seconds / 60),
        time: Date.now()
      });
      persistState();
    }

    seconds = 0;
    display.textContent = "00:00";
    renderTodayRing();
  };
}

function format(sec) {
  return `${String(Math.floor(sec/60)).padStart(2,"0")}:${String(sec%60).padStart(2,"0")}`;
}
