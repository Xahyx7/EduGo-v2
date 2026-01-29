// ui/settings.js

import { appState, persistState } from "../state/state.js";

const STORAGE_KEY = "eduGoState";

export function setupSettings() {
  const btn = document.getElementById("settingsBtn");
  if (!btn) return;

  btn.onclick = openSettings;
}

function openSettings() {
  if (document.getElementById("settingsOverlay")) return;

  document.body.insertAdjacentHTML("beforeend", `
    <div id="settingsOverlay" class="settings-overlay">
      <div class="settings-card">
        <h2>Settings</h2>

        <div class="settings-actions">
          <button id="exportData">📤 Export Data</button>
          <button id="importData">📥 Import Data</button>
        </div>

        <input type="file" id="importFile" accept=".json" hidden />

        <button id="closeSettings" class="close-btn">Close</button>
      </div>
    </div>
  `);

  document.getElementById("closeSettings").onclick = closeSettings;
  document.getElementById("exportData").onclick = exportData;
  document.getElementById("importData").onclick = () =>
    document.getElementById("importFile").click();

  document.getElementById("importFile").onchange = importData;
}

function closeSettings() {
  document.getElementById("settingsOverlay")?.remove();
}

/* ================= EXPORT (FIXED) ================= */

function exportData() {
  // 🔑 Ensure latest state is saved first
  persistState();

  // 🔑 Export from MEMORY, not localStorage
  const data = JSON.stringify(appState, null, 2);

  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "edugo-backup.json";
  a.click();

  URL.revokeObjectURL(url);
}

/* ================= IMPORT ================= */

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);

      // 🔒 Validate structure
      if (
        !parsed ||
        !Array.isArray(parsed.subjects) ||
        !Array.isArray(parsed.goals) ||
        !Array.isArray(parsed.sessions)
      ) {
        alert("Invalid EduGo backup file");
        return;
      }

      const ok = confirm(
        "This will OVERWRITE your current data.\nContinue?"
      );
      if (!ok) return;

      // ✅ Write to storage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

      // ✅ Hard reload to rehydrate appState
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Failed to import data");
    }
  };

  reader.readAsText(file);
}
