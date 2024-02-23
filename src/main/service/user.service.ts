import { Channel } from '@/common/channel';
import { ipcMain } from 'electron';
import { createUser, getUsers } from '../controller/user.controller';

export default function userService() {
    ipcMain.handle(Channel.CREATE_USER, createUser);
    ipcMain.handle(Channel.GET_ALL_USERS, getUsers);
}
