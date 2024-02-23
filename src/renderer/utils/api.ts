import type { ChannelType } from '@/common/channel';

export default class DbApi {
    static async create(channel: ChannelType, data: unknown) {
        const response = await window.electron.ipcRenderer.invoke(
            channel,
            data
        );

        return response;
    }

    static async read(channel: ChannelType, data?: unknown | undefined) {
        const response = await window.electron.ipcRenderer.invoke(
            channel,
            data
        );

        return response;
    }
}
