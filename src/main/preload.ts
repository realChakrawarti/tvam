import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

import { ChannelType } from '@/common/channel';

const electronHandler = {
    ipcRenderer: {
        sendMessage(channel: ChannelType, args?: any) {
            ipcRenderer.send(channel, args);
        },
        invoke(channel: ChannelType, ...args: any) {
            return ipcRenderer.invoke(channel, ...args);
        },
        on(channel: ChannelType, func: (...args: any) => void) {
            const subscription = (_event: IpcRendererEvent, ...args: any) =>
                func(...args);
            ipcRenderer.on(channel, subscription);

            return () => {
                ipcRenderer.removeListener(channel, subscription);
            };
        },
        once(channel: ChannelType, func: (...args: any) => void) {
            ipcRenderer.once(channel, (_event, ...args) => func(...args));
        },
        removeListener(channel: ChannelType, listener: (...args: any) => void) {
            ipcRenderer.removeListener(channel, listener);
        },
        removeAllListeners(channel: ChannelType) {
            ipcRenderer.removeAllListeners(channel);
        },
    },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

// const apiHandler = {
//     user: controller.user,
// };

// contextBridge.exposeInMainWorld('api', apiHandler);

export type ElectronHandler = typeof electronHandler;
// export type APIHandler = typeof apiHandler;
