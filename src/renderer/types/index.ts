export const ROUTE = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    ROOT: '/',
    DASHBOARD: '/dashboard',
    WILDCARD: '*',
    ACTIVITY: 'activity',
    APPS: 'apps',
    AUTHENTICATE: '/auth',
    FEAR_SETTING: '/feature/fear-setting',
    FEATURE: '/feature',
} as const;

export type RoutePath = (typeof ROUTE)[keyof typeof ROUTE];
