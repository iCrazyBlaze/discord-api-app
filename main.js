const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
  })
  mainWindow.setTitle("Discord Developer App");

  // Create custom application menu
  var menu = electron.Menu.buildFromTemplate([{
      label: 'Main menu',
      submenu: [{
        label: 'Discord API Docs (opens in new window)',
        click: function() {
            newWindow = new BrowserWindow({width: 800, height: 600})
            newWindow.setMenu(null);
            newWindow.setTitle("Discord - Developer Documentation");
            newWindow.loadURL("https://discordapp.com/developers/docs/intro")
        }
      },

      {
          label: 'Discord StreamKit Overlay',
          click: function() {
            mainWindow.setTitle("Discord StreamKit Overlay")
            mainWindow.loadURL("http://streamkit.discordapp.com/overlay")
          }
        },


        {
            label: 'BlazeBot GitHub Repo',
            click: function() {
              mainWindow.setTitle("GitHub")
              mainWindow.loadURL("https://github.com/iCrazyBlaze/BlazeBot")
            }
          },


      {type: 'separator'},


        {
            label: 'Unofficial API Comparison',
            click: function() {
              mainWindow.setTitle("Discord API")
              mainWindow.loadURL(url.format({
                pathname: path.join(__dirname, 'unofficial/comparison.html'),
                protocol: 'file:',
                slashes: true
              }))
            }
          },

          {
              label: 'Unofficial API Libs',
              click: function() {
                  mainWindow.setTitle("Discord API")
                  mainWindow.loadURL(url.format({
                    pathname: path.join(__dirname, 'unofficial/libs.html'),
                    protocol: 'file:',
                    slashes: true
                  }))
              }
            },

            {
                label: 'Discord Permissions Calculator',
                click: function() {
                    mainWindow.setTitle("Discord Permissions Calculator")
                    mainWindow.loadURL(url.format({
                      pathname: path.join(__dirname, 'unofficial/permissions.html'),
                      protocol: 'file:',
                      slashes: true
                    }))
                }
              },



      {type: 'separator'},

              {
                  label: 'Go to the Index page',
                  click: function() {
                      mainWindow.setTitle("Discord API tools")
                      mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname, 'index.html'),
                        protocol: 'file:',
                        slashes: true
                      }))
                  }
                },


                {
                    label: 'Open Developer Tools',
                    click: function() {
                        mainWindow.webContents.openDevTools()
                        }

                  },


      {
          label: 'Exit app',
          click: function() {
              app.exit()
              }

        },


    ],




    }]);

    // set application menu
    electron.Menu.setApplicationMenu(menu);


    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null
    })
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow)

  // Quit when all windows are closed.
  app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow()
    }
  })

  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.
