// state/reducers.js
import { appState } from "./state.js";
import { saveState } from "./persistence.js";

export function addSubject(subject) {
  appState.subjects.push({
    id: crypto.randomUUID(),
    completedUnits: 0,
    timeSpent: 0,
    ...subject
  });
  commit();
}

export function completeUnit(subjectId, units = 1) {
  const subject = appState.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  subject.completedUnits = Math.min(
    subject.completedUnits + units,
    subject.totalUnits
  );

  commit();
}

export function addSession(session) {
  appState.sessions.push(session);

  const subject = appState.subjects.find(s => s.id === session.subjectId);
  if (subject) {
    subject.timeSpent += session.duration;
  }

  commit();
}

function commit() {
  appState.meta.lastUpdated = Date.now();
  saveState(appState);
}
