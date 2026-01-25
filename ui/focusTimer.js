// ui/focusTimer.js

import { appState, persistState } from "../state/state.js";
import { renderTodayRing } from "./todayRing.js";
import { renderGoals } from "./renderGoals.js";

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
      // save session
      appState.sessions.push({
        subjectId: activeSubjectId,
        minutes,
        time: Date.now()
      });

      // 🔥 AUTO-UPDATE GOALS
      updateGoals(activeSubjectId, minutes);

      persistState();
      renderGoals();
      renderTodayRing();
    }

    seconds = 0;
    display.textContent = "00:00";
  };
}

function updateGoals(subjectId, minutes) {
  const activeGoals = appState.goals.filter(
    g =>
      g.subjectId === subjectId &&
      g.type === "time" &&
      !g.completed
  );

  let remaining = minutes;

  for (const goal of activeGoals) {
    if (remaining <= 0) break;

    const needed = goal.target - goal.progress;
    const used = Math.min(needed, remaining);

    goal.progress += used;
    remaining -= used;

    if (goal.progress >= goal.target) {
      goal.completed = true;
    }
  }
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
