// app/app.js

import { loadState } from "./state/persistence.js";
import { renderDashboard } from "./ui/dashboard.js";

// Load saved data from localStorage
loadState();

// Render dashboard UI (read-only for now)
renderDashboard();
