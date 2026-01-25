// state/state.js

import { loadState, saveState } from "./persistence.js";

const defaultState = {
  subjects: [],
  goals: [],
  sessions: []
};

// Load saved state or fallback
export const appState = loadState() || defaultState;

// Auto-save on any mutation (simple but effective)
export function persistState() {
  saveState(appState);
}
