import type HttpStatusCode from './httpStatusCode';

export type SQLiteResponse<T = unknown> = {
    status: HttpStatusCode;
    message: string;
    data: T;
};
