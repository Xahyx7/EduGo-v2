// SAVE STUDY SESSION (used by timer & focus mode)
export function addStudySession(subjectId, minutes) {
  if (!minutes || minutes <= 0) return;

  appState.sessions.push({
    subjectId,
    minutes,
    time: Date.now()
  });

  const subject = appState.subjects.find(s => s.id === subjectId);
  if (subject) {
    subject.timeSpent += minutes;
  }

  saveState(appState);
}

// UPDATE GOALS
export function updateGoals(daily, weekly) {
  appState.goals.dailyMinutes = daily;
  appState.goals.weeklyMinutes = weekly;
  saveState(appState);
}
