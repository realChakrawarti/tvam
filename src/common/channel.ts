export const Channel = {
    CREATE_USER: 'CREATE_USER',
    GET_ALL_USERS: 'GET_ALL_USERS',
} as const;

export type ChannelType = (typeof Channel)[keyof typeof Channel];
