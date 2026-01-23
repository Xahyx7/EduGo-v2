// app.js

import { loadState } from "./state/persistence.js";
import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubjectModal } from "./ui/addSubjectModal.js";
import { setupFocusTimer } from "./ui/focusTimer.js";

loadState();
renderDashboard();
setupAddSubjectModal();
setupFocusTimer();
