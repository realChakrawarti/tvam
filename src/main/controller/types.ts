import HttpStatusCode from './httpStatusCode';

export type SQLiteResponse<T = void> = {
    status: HttpStatusCode;
    message: string;
    data: T;
};
