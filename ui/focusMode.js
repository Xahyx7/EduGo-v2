// ui/focusMode.js

import { addTimeToSubject } from "../state/reducers.js";
import { renderDashboard } from "./dashboard.js";

let interval = null;
let seconds = 0;
let activeSubjectId = null;

export function setupFocusMode() {
  const openBtn = document.getElementById("enterFocusMode");
  const closeBtn = document.getElementById("exitFocus");
  const startBtn = document.getElementById("focusStart");
  const pauseBtn = document.getElementById("focusPause");
  const stopBtn = document.getElementById("focusStop");

  const overlay = document.getElementById("focusOverlay");
  const subjectSelect = document.getElementById("timerSubject");
  const subjectLabel = document.getElementById("focusSubject");
  const timeDisplay = document.getElementById("focusTime");

  if (!openBtn) return;

  openBtn.onclick = () => {
    if (!subjectSelect.value) {
      alert("Select a subject first");
      return;
    }

    activeSubjectId = subjectSelect.value;
    subjectLabel.textContent =
      subjectSelect.options[subjectSelect.selectedIndex].text;

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  closeBtn.onclick = exitFocusMode;

  startBtn.onclick = () => {
    if (interval) return;

    interval = setInterval(() => {
      seconds++;
      timeDisplay.textContent = format(seconds);
    }, 1000);
  };

  pauseBtn.onclick = () => {
    clearInterval(interval);
    interval = null;
  };

  stopBtn.onclick = () => {
    clearInterval(interval);
    interval = null;

    if (activeSubjectId && seconds > 0) {
      addTimeToSubject(activeSubjectId, Math.floor(seconds / 60));
      renderDashboard();
    }

    exitFocusMode();
  };

  function exitFocusMode() {
    clearInterval(interval);
    interval = null;
    seconds = 0;
    timeDisplay.textContent = "00:00";

    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
