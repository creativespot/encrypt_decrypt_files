const electron = require('electron');
const glob = require('glob');
const path = require('path');
const autoUpdater = require('./auto-updater');

// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
// Pick up second start variable as debug variable
const debug = process.argv[2];


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

function initialize() {
    let shouldQuit = makeSingleInstance();
    if (shouldQuit) return app.quit();
    loadMainProcessJs();
}

function createWindow() {
    let windowOptions = {
        width: 1080,
        minWidth: 680,
        height: 840,
        title: app.getName(),
        frame: false,
        show: false
    };
    // Create the browser window.
    mainWindow = new BrowserWindow(windowOptions);

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/dist/index.html`);
    mainWindow.once('ready-to-show', function() {
        mainWindow.show();
    });

    // Open the DevTools.
    if (debug) {
        mainWindow.webContents.openDevTools();
        mainWindow.maximize();
        require('devtron').install()
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// Require each JS file in the main_process dir
function loadMainProcessJs() {
    let files;
    files = glob.sync(path.join(__dirname, 'main_process/*.js'));
    files.forEach(function (file) {
        require(file)
    });
    files = glob.sync(path.join(__dirname, 'main_process/**/*.js'));
    files.forEach(function (file) {
        require(file)
    });
    autoUpdater.updateMenu()
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance() {
    if (process.mas) return false;

    return app.makeSingleInstance(function () {
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function () {
    createWindow();
    autoUpdater.initialize();
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

initialize();