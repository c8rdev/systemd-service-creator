const { app, BrowserWindow, dialog } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 200,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  win.setMenuBarVisibility(false)
  win.loadFile('./src/index.html')
  // win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})