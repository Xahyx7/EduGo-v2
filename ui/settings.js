// ui/settings.js

import { appState, persistState } from "../state/state.js";

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

/* ================= EXPORT ================= */

function exportData() {
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

      if (!parsed.subjects || !parsed.goals || !parsed.sessions) {
        alert("Invalid EduGo backup file");
        return;
      }

      const ok = confirm(
        "This will overwrite your current data.\nContinue?"
      );

      if (!ok) return;

      localStorage.setItem("eduGoState", JSON.stringify(parsed));
      location.reload();

    } catch {
      alert("Failed to import file");
    }
  };

  reader.readAsText(file);
}
