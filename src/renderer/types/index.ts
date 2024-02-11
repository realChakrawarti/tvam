export const ROUTE = {
    LOGIN: '/login',
    SIGNUP: '/signup',
    ROOT: '/',
    DASHBOARD: '/dashboard',
} as const;

export type RoutePath = (typeof ROUTE)[keyof typeof ROUTE];
