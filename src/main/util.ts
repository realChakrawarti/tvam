import { URL } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import { customAlphabet } from 'nanoid';

export function resolveHtmlPath(htmlFileName: string) {
    if (process.env.NODE_ENV === 'development') {
        const port = process.env.PORT || 1212;
        const url = new URL(`http://localhost:${port}`);
        url.pathname = htmlFileName;
        return url.href;
    }
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
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
