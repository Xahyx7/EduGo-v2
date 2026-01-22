// state/persistence.js
import { appState } from "./state.js";

const KEY = "edugo_state_v2";

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function loadState() {
  const saved = localStorage.getItem(KEY);
  if (!saved) return;

  const parsed = JSON.parse(saved);

  Object.assign(appState, parsed);
}
