// ui/focusTimer.js

import { addStudySession } from "../state/reducers.js";
import { renderDashboard } from "./dashboard.js";

let timerInterval = null;
let seconds = 0;
let activeSubjectId = null;

export function setupFocusTimer() {
  const startBtn = document.getElementById("startTimer");
  const pauseBtn = document.getElementById("pauseTimer");
  const stopBtn = document.getElementById("stopTimer");
  const subjectSelect = document.getElementById("timerSubject");
  const display = document.getElementById("timerDisplay");

  if (!startBtn || !pauseBtn || !stopBtn) return;

  startBtn.onclick = () => {
    if (!subjectSelect.value) {
      alert("Select a subject first");
      return;
    }

    activeSubjectId = subjectSelect.value;

    if (timerInterval) return;

    timerInterval = setInterval(() => {
      seconds++;
      display.textContent = formatTime(seconds);
    }, 1000);
  };

  pauseBtn.onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;
  };

  stopBtn.onclick = () => {
    clearInterval(timerInterval);
    timerInterval = null;

    const minutes = Math.floor(seconds / 60);

    if (activeSubjectId && minutes > 0) {
      // ✅ THIS UPDATES:
      // - subject time
      // - daily goal
      // - weekly goal
      addStudySession(activeSubjectId, minutes);
      renderDashboard();
    }

    seconds = 0;
    display.textContent = "00:00";
  };
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
