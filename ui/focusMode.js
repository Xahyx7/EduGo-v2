// ui/focusMode.js

import { addTimeToSubject } from "../state/reducers.js";
import { renderDashboard } from "./dashboard.js";

let interval = null;
let seconds = 0;
let activeSubjectId = null;


export function setupFocusMode() {
  const openBtn = document.getElementById("enterFocusMode");
  const overlay = document.getElementById("focusOverlay");

  // 🛑 If focus mode UI is not present, DO NOTHING
  if (!openBtn || !overlay) {
    return;
  }

  const closeBtn = document.getElementById("exitFocus");
  const startBtn = document.getElementById("focusStart");
  const pauseBtn = document.getElementById("focusPause");
  const stopBtn = document.getElementById("focusStop");

  const subjectSelect = document.getElementById("timerSubject");
  const subjectLabel = document.getElementById("focusSubject");
  const timeDisplay = document.getElementById("focusTime");

  let interval = null;
  let seconds = 0;
  let activeSubjectId = null;

  openBtn.onclick = () => {
    if (!subjectSelect || !subjectSelect.value) {
      alert("Select a subject first");
      return;
    }

    activeSubjectId = subjectSelect.value;
    subjectLabel.textContent =
      subjectSelect.options[subjectSelect.selectedIndex].text;

    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  };

  closeBtn && (closeBtn.onclick = exit);
  startBtn && (startBtn.onclick = start);
  pauseBtn && (pauseBtn.onclick = pause);
  stopBtn && (stopBtn.onclick = stop);

  function start() {
    if (interval) return;
    interval = setInterval(() => {
      seconds++;
      timeDisplay.textContent = format(seconds);
    }, 1000);
  }

  function pause() {
    clearInterval(interval);
    interval = null;
  }

  function stop() {
    pause();
    seconds = 0;
    timeDisplay.textContent = "00:00";
    exit();
  }

  function exit() {
    pause();
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}

