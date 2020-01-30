const { app, BrowserWindow, ipcMain, dialog } = require('electron')

//新建窗口类
class AppWindow extends BrowserWindow {
  constructor(config, fileLocation) {
    const basicConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      }
    }
    const finalConfig = { ...basicConfig, ...config }
    super(finalConfig)
    this.loadFile(fileLocation)
    this.once('ready-to-show', () => {
      this.show()
    })
  }
}

app.on('ready', () => {
  const mainWIndow = new AppWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
    
  }, './weibo/index.html')
  ipcMain.on('show-single-weibo', (event) => {
    console.log("Open single weibo window")
    const singleWeibo = new AppWindow({
      width: 400,
      height: 300,
      autoHideMenuBar: true,
      frame: false,
      parent: mainWIndow
    }, './weibo/item.html')
    singleWeibo.webContents.openDevTools()
    event.sender.send('single-weibo-get', "get")
  })
  ipcMain.on('show-weibo-list', (event) => {
    const singleWeibo = new AppWindow({
      width: 400,
      height: 600,
      autoHideMenuBar: true,
      frame: false,
      parent: mainWIndow
    }, './weibo/lists.html')
    singleWeibo.webContents.openDevTools()
    event.sender.send('single-weibo-get', "get")
  })

})


