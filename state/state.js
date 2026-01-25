// state/state.js

import { loadState, saveState } from "./persistence.js";

const defaultState = {
  subjects: [],
  goals: [],
  sessions: []
};

export const appState = loadState() || defaultState;

export function persistState() {
  saveState(appState);
}
