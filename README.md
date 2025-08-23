
# Google Drive & GeminiAI Dual FAB Extension for EspoCRM

An EspoCRM extension that adds **floating action buttons (FABs)** in the bottom-right corner:
- **Google Drive FAB** → opens a small search panel to query Drive (`https://drive.google.com/drive/search?q=…`).
- **Gemini AI FAB** → opens [Gemini](https://gemini.google.com) in a new tab.

## Features
- Floating buttons always visible (fixed bottom-right).
- Vertical stacking (Gemini above Drive).
- Drive FAB opens a minimal search panel with input + keyboard shortcut (⌘/Ctrl + K).
- Lightweight: pure JavaScript + CSS, no backend changes.
- Compatible with **EspoCRM 9.x**.

## Language & Texts
By default, the Drive search panel shows **Italian text**:
- `placeholder="Cerca in Drive..."`  
- Button label: `Cerca`  
- Button label: `Chiudi (Esc)`  

To change language, edit the file:
```
files/client/custom/gdrive-gemini-dual-fab.js
```
and replace those three strings with your desired translations.

## Installation
1. Download the latest release `.zip`.
2. In EspoCRM, go to **Administration → Extensions → Install**.
3. Upload the `.zip` and confirm.
4. Run **Rebuild** (if not prompted).
5. Hard refresh the browser (Ctrl/Cmd + Shift + R).

## Usage
- **Drive FAB**: click or press ⌘/Ctrl + K → type your query → opens Drive search in a new tab.
- **Gemini FAB**: click → opens [Gemini](https://gemini.google.com) in a new tab.

## Credits
- **Ideated and developed by [Daniel Giovannetti](https://github.com/dgiovannetti)**  
- Released publicly as an open-source helper for the EspoCRM community.

## Security
- The extension does **not** access or expose any CRM data.
- It only injects client-side UI elements.
- Google Drive/Gemini access depends on the user’s own Google account session.
- Safe to use in production: no backend logic, no API keys.

## License
MIT License
