import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let mainWindow: null | BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js'),
      preload: path.resolve(__dirname, '../preload/preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

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

ipcMain.on('save-file', async (_, text: string) => {
  const { filePath } = await dialog.showSaveDialog(mainWindow!, {
    title: 'Save JSON File',
    defaultPath: 'data.json',
    filters: [
      { name: 'JSON Files', extensions: ['json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });

  if (filePath) {
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        console.error('Failed to save the file:', err);
      } else {
        console.log('File successfully saved to', filePath);
      }
    });
  }
});
