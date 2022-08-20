'use strict';

var electron = require('electron');
var path = require('node:path');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var path__default = /*#__PURE__*/_interopDefaultLegacy(path);

electron.ipcMain.handle('stdout', (event, msg) => {
  console.log(msg);
});

electron.ipcMain.handle('db:saveNode', async (event, node) => {
  console.log('db:saveNode was called!');
});

const createWindow = () => {
  const win = new electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path__default["default"].join(__dirname, 'preload.js'),
    }
  });

  win.loadFile(path__default["default"].join(__dirname, 'index.html'));
};

electron.app.whenReady().then(() => {
  createWindow();

  electron.app.on('activate', () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

electron.app.on('window-all-closed', () => {
  if (process.platform === 'linux' || process.platform === 'win32') {
    electron.app.quit();
  }
});
