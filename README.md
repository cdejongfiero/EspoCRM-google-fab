
# Google Workspace Quick Actions (Drive, Gemini, Gmail, Radial Menu) for EspoCRM

An EspoCRM extension that adds **floating action buttons (FABs)** in the bottom-right corner:
- **Gemini AI FAB** → opens [Gemini](https://gemini.google.com) in a new tab.
- **Google Drive FAB** → opens a small search panel to query Drive (`https://drive.google.com/drive/search?q=…`).
- **Gmail FAB** → opens a small search panel to query Gmail (`https://mail.google.com/mail/u/0/#search/…`).
- **Google Workspace FAB** → toggles a radial mini-menu with quick links to:
  - **Sheets** (`https://docs.google.com/spreadsheets`)
  - **Docs** (`https://docs.google.com/document`)
  - **Slides** (`https://docs.google.com/presentation`)
  - **Forms** (`https://docs.google.com/forms`)

## Features
- Floating buttons always visible (fixed bottom-right).
- Vertical stacking (Gemini, Drive, Gmail, Workspace).
- Drive FAB opens a minimal search panel (input + Enter; optional Esc to close).
- Gmail FAB opens a minimal search panel (input + Enter; optional Esc to close).
- Workspace FAB opens a stylish radial mini-menu (Sheets, Docs, Slides, Forms).
- Lightweight: pure JavaScript + CSS, no backend changes.
- Compatible with **EspoCRM 9.x**.

## Language & Texts
By default, the search panels show English text:
- Drive panel: `placeholder="Search in Drive..."`, buttons `Search` and `Close (Esc)`
- Gmail panel: `placeholder="Search in Gmail..."`, buttons `Search` and `Close (Esc)`

To change the language, edit the file:
```
files/client/custom/fab.js
```
and replace those strings with your desired translations.

## Installation
1. Download the latest release `.zip`.
2. In EspoCRM, go to **Administration → Extensions → Install**.
3. Upload the `.zip` and confirm.
4. Run **Rebuild** (if not prompted).
5. Hard refresh the browser (Ctrl/Cmd + Shift + R).

## Usage
- **Gemini FAB**: click → opens [Gemini](https://gemini.google.com) in a new tab.
- **Drive FAB**: click → opens the Drive search panel → type your query → opens Drive search in a new tab.
- **Gmail FAB**: click → opens the Gmail search panel → type your query → opens Gmail search in a new tab.
- **Workspace FAB**: click → toggles the radial menu; click on Sheets/Docs/Slides/Forms to open the respective app in a new tab.

## Credits
- **Ideated and developed by [Daniel Giovannetti](https://github.com/dgiovannetti)**  
- Released publicly as an open-source helper for the EspoCRM community.

## Security
- The extension does **not** access or expose any CRM data.
- It only injects client-side UI elements.
- Google services access (Drive, Gmail, Gemini, etc.) depends on the user’s own Google account session.
- Safe to use in production: no backend logic, no API keys.

## License
MIT License
