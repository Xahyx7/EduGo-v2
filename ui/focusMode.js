// ui/focusMode.js

import { appState, persistState } from "../state/state.js";
import { renderGoals } from "./renderGoals.js";
import { renderTodayRing } from "./todayRing.js";

export function enterFocusMode(goalId) {
  appState.activeGoalId = goalId;
  persistState();

  const goal = appState.goals.find(g => g.id === goalId);
  if (!goal) return;

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="focusOverlay" class="focus-overlay">
      <div class="focus-card">
        <h2>${goal.subjectName}</h2>
        <h3>${goal.topic}</h3>

        <div id="focusTimerDisplay" class="focus-time">00:00</div>

        <div class="focus-actions">
          <button id="focusStart">Start</button>
          <button id="focusPause">Pause</button>
          <button id="focusStop">Stop</button>
          <button id="focusExit">Exit</button>
        </div>
      </div>
    </div>
    `
  );

  setupFocusModeTimer();
}

function setupFocusModeTimer() {
  let timer = null;
  let seconds = 0;

  const display = document.getElementById("focusTimerDisplay");

  document.getElementById("focusStart").onclick = () => {
    if (timer) return;

    timer = setInterval(() => {
      seconds++;
      display.textContent = format(seconds);
    }, 1000);
  };

  document.getElementById("focusPause").onclick = () => {
    clearInterval(timer);
    timer = null;
  };

  document.getElementById("focusStop").onclick = () => {
    clearInterval(timer);
    timer = null;

    const minutes = Math.floor(seconds / 60);
    const goal = appState.goals.find(g => g.id === appState.activeGoalId);

    if (goal && minutes > 0) {
      // 🔥 UPDATE GOAL
      goal.progress += minutes;
      if (goal.progress >= goal.target) {
        goal.progress = goal.target;
        goal.completed = true;
      }

      // 🔥 UPDATE TODAY RING (SESSION)
      appState.sessions.push({
        subjectId: goal.subjectId,
        minutes,
        time: Date.now()
      });

      persistState();
      renderGoals();
      renderTodayRing();
    }

    seconds = 0;
    display.textContent = "00:00";
  };

  document.getElementById("focusExit").onclick = () => {
    document.getElementById("focusOverlay").remove();
    appState.activeGoalId = null;
    persistState();
  };
}

function format(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${m}:${s}`;
}
