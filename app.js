const { app, BrowserWindow } = require('electron');
const { join } = require('path');

let mainWindow = null;

(async function init() {
  await app.whenReady();

  mainWindow = new BrowserWindow({
    height: 800,
    width: 1000,
  });

  mainWindow.loadURL(`file:${join(__dirname, 'dist/angular-electron-demo/index.html')}`);

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => mainWindow = null);
  app.on('quit', mainWindow = null);
})();