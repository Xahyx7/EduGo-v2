// state/selectors.js
import { appState } from "./state.js";

export function getDashboardStats() {
  const today = new Date().toDateString();

  const todaySessions = appState.sessions.filter(
    s => new Date(s.startTime).toDateString() === today
  );

  const todayTime = todaySessions.reduce((a, b) => a + b.duration, 0);

  return {
    todayTime,
    subjectCount: appState.subjects.length,
    completedSubjects: appState.subjects.filter(
      s => s.completedUnits === s.totalUnits
    ).length
  };
}

export function getSubjectProgress(subjectId) {
  const subject = appState.subjects.find(s => s.id === subjectId);
  if (!subject) return null;

  return {
    percent: (subject.completedUnits / subject.totalUnits) * 100,
    timeSpent: subject.timeSpent,
    remainingUnits: subject.totalUnits - subject.completedUnits
  };
}
