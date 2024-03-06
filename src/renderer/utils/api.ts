import type { ChannelType } from '@/common/channel';

export default class DbApi {
    static async invoke(channel: ChannelType, data?: unknown | undefined) {
        const response = await window.electron.ipcRenderer.invoke(
            channel,
            data
        );

        return response;
    }
}
