// state/reducers.js

import { appState } from "./state.js";
import { saveState } from "./persistence.js";

export function addSubject(subject) {
  appState.subjects.push({
    id: crypto.randomUUID(),
    ...subject
  });
  saveState(appState);
}
