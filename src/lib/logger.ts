// Refer: https://github.com/megahertz/electron-log
import log from 'electron-log/main';
import path from 'node:path';

function getCurrentTimestamp(): string {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());
    const meridiem = now.getHours() < 12 ? 'AM' : 'PM';

    return `[${hours}:${minutes}:${seconds} ${meridiem}]`;
}

function padZero(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
}

// log.initialize();
log.variables.time = getCurrentTimestamp();
// Refer for modifying the logger: https://github.com/megahertz/electron-log/blob/master/docs/extend.md#transport
log.transports.console.format = '{level} {time} {processType}:{scope} > {text}';
log.transports.console.useStyles = true;
log.transports.file.resolvePathFn = () =>
    path.join(process.resourcesPath, 'logs');

export const dbLog = log.scope('db');

export default log;
