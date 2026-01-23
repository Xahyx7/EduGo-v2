// state/reducers.js

import { appState } from "./state.js";
import { saveState } from "./persistence.js";

// ADD SUBJECT (already used)
export function addSubject(subject) {
  appState.subjects.push({
    id: crypto.randomUUID(),
    completedUnits: 0,
    timeSpent: 0,
    ...subject
  });
  saveState(appState);
}

// +1 UNIT
export function incrementUnit(subjectId) {
  const subject = appState.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  if (subject.completedUnits < subject.totalUnits) {
    subject.completedUnits += 1;
    saveState(appState);
  }
}

// -1 UNIT (optional but safe)
export function decrementUnit(subjectId) {
  const subject = appState.subjects.find(s => s.id === subjectId);
  if (!subject) return;

  if (subject.completedUnits > 0) {
    subject.completedUnits -= 1;
    saveState(appState);
  }
}
