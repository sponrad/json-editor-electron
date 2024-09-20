import { app, BrowserWindow } from 'electron';
import * as path from 'path';

let mainWindow: null | BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 1280, height: 960 });

  // Vite dev server URL
  mainWindow.loadURL('http://localhost:5173');
  mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow == null) {
    createWindow();
  }
});
