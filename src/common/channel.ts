export const Channel = {
    CREATE_USER: 'CREATE_USER',
};

export type ChannelType = (typeof Channel)[keyof typeof Channel];
