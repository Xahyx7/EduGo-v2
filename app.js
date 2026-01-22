// app.js

import { loadState } from "./state/persistence.js";
import { renderDashboard } from "./ui/dashboard.js";
import { setupAddSubject } from "./ui/addSubject.js";

loadState();
renderDashboard();
setupAddSubject();
