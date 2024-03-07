import path from 'path';
import type { Tray } from 'electron';
import { app, BrowserWindow } from 'electron';
import sourceMapSupport from 'source-map-support';
import { createTray, getAssetPath, resolveHtmlPath, verifyDb } from './util';
import registerServices from './service';
import { DatabaseHelper } from './model/databaseHelper';

let mainWindow: BrowserWindow | null = null;
let tray: Tray | null = null;

const sqliteDbPath =
    process.env.NODE_ENV !== 'production'
        ? path.join(__dirname, '../../database/tvam.sqlite')
        : path.join(process.resourcesPath, 'database', 'tvam.sqlite');

verifyDb(sqliteDbPath);

if (process.env.NODE_ENV === 'production') {
    sourceMapSupport.install();
}

const isDebug =
    process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

const createWindow = async () => {
    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('logo.png'),
        webPreferences: {
            preload: app.isPackaged
                ? path.join(__dirname, 'preload.js')
                : path.join(__dirname, '../../.erb/dll/preload.js'),
        },
    });

    mainWindow.loadURL(resolveHtmlPath('index.html'));

    mainWindow.on('ready-to-show', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }

        if (isDebug) {
            mainWindow.webContents.openDevTools();
        }

        if (app.isPackaged) {
            mainWindow.removeMenu();
        }

        if (tray) {
            tray.destroy();
        }
        tray = createTray(mainWindow);

        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        DatabaseHelper.closeDatabase();
        app.quit();
    }
});

app.whenReady()
    .then(async () => {
        await DatabaseHelper.initDb(sqliteDbPath);
    })
    .then(() => {
        registerServices();
        createWindow();
        app.on('activate', () => {
            // On macOS it's common to re-create a window in the app when the
            // dock icon is clicked and there are no other windows open.
            if (mainWindow === null) createWindow();
        });
    })
    .catch(console.log);
