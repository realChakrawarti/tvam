export const ROUTE = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    ROOT: '/',
    DASHBOARD: '/dashboard',
    WILDCARD: '*',
    ACTIVITY: 'activity',
    APPS: 'apps',
    AUTHENTICATE: '/auth',
} as const;

export type RoutePath = (typeof ROUTE)[keyof typeof ROUTE];
