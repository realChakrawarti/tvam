import { URL } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { customAlphabet } from 'nanoid';
import type { BrowserWindow } from 'electron';
import { Menu, Tray, app } from 'electron';

export function resolveHtmlPath(htmlFileName: string) {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
}

const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

export const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
};

/**
 *
 * @param mainWindow The mainWindow from main process
 * @returns void
 *
 * Creates a system tray with lets user to show, hide or to exit the application.
 */
export function createTray(mainWindow: BrowserWindow) {
    const appIcon = new Tray(getAssetPath('logo.ico'));
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show',
            click() {
                mainWindow.maximize();
                mainWindow.show();
            },
        },
        {
            label: 'Hide',
            click() {
                mainWindow.minimize();
            },
        },
        {
            label: 'Exit',
            click() {
                process.exit();
            },
        },
    ]);

    appIcon.on('double-click', () => mainWindow.show());
    appIcon.setToolTip('Tvam | त्वम्');
    appIcon.setContextMenu(contextMenu);
    return appIcon;
}

export function generateId(size = 16, prefix = ''): string {
    const alphabet =
        '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const nanoid = customAlphabet(alphabet, size);
    if (prefix) {
        return `${prefix}_${nanoid()}`;
    }
    return nanoid();
}

export function verifyDb(dbPath: string) {
    // Check if the directory exists, create it if not

    const dbDirectory = dirname(dbPath);

    if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true });
    }

    // Check if the file exists, create it if not
    if (!fs.existsSync(dbPath)) {
        // You can perform additional tasks here, like initializing the database
        // For now, let's just create an empty file
        fs.writeFileSync(dbPath, '');
    } else {
        console.log('File already exists');
    }
}
