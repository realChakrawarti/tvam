import { Channel } from '@/common/channel';
import { ipcMain } from 'electron';
import { createUser } from '../controller/user.controller';

export function userServices() {
    ipcMain.handle(Channel.CREATE_USER, createUser);
}
