import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  saveFile: (text: string) => ipcRenderer.send('save-file', text),
});

declare global {
  interface Window {
    electronAPI: {
      saveFile: (text: string) => void;
    };
  }
}
