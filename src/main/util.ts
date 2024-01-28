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
    } else return nanoid();
}

export function verifyDb(path: string) {
    // Check if the directory exists, create it if not

    const dbDirectory = dirname(path);

    if (!fs.existsSync(dbDirectory)) {
        fs.mkdirSync(dbDirectory, { recursive: true });
    }

    // Check if the file exists, create it if not
    if (!fs.existsSync(path)) {
        // You can perform additional tasks here, like initializing the database
        // For now, let's just create an empty file
        fs.writeFileSync(path, '');
    } else {
        console.log('File already exists');
    }
}
