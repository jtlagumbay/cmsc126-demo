# Kanban Board

An offline Kanban board built with HTML, CSS, and vanilla JavaScript. Tasks persist via `localStorage`.

## Setup

No build step or dependencies required.

### Option 1 — VS Code Live Server (recommended)

1. Open the project folder in VS Code.
2. Install the **Live Server** extension if not already installed.
3. Right-click `index.html` → **Open with Live Server**.

### Option 2 — Python HTTP server

```bash
cd kanban-board
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

> **Note:** The app uses ES modules (`import`/`export`), so it must be served over HTTP — opening `index.html` directly as a `file://` URL will not work.

## Features

- Three columns: **To Do**, **Doing**, **Done**
- Create, edit, delete, and move tasks between columns
- Drag-and-drop tasks between columns
- All data persisted in `localStorage` (survives page refresh)
- Fully keyboard-accessible:
  - `Tab` to focus cards and buttons
  - `←` / `→` arrow keys on a focused card to move it between columns
  - `Enter` or `E` on a focused card to edit
  - `Delete` or `Backspace` on a focused card to delete
  - `Escape` to close the modal
  - `Tab` / `Shift+Tab` to cycle focus within the modal
- Responsive mobile layout

## Project Structure

```
kanban-board/
├── index.html
├── styles/
│   └── base.css
├── pages/
│   └── board/
│       ├── board.css
│       └── board.js
├── components/
│   ├── card/
│   │   ├── card.css
│   │   └── card.js
│   ├── column/
│   │   ├── column.css
│   │   └── column.js
│   └── modal/
│       ├── modal.css
│       └── modal.js
├── services/
│   └── storage-service.js
└── utils/
    └── dom-utils.js
```
