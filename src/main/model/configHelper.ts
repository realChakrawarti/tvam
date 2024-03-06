import path from 'path';
import { verifyDb } from '../util';

const lowDbPath =
    process.env.NODE_ENV !== 'production'
        ? path.join(__dirname, '../../database/config.json')
        : path.join(process.resourcesPath, 'appSetting', 'congig.json');

verifyDb(lowDbPath);
