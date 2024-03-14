import type { IpcMainInvokeEvent } from 'electron/main';
import { handleCatchError } from '@/lib/utils';
import { dbLog } from '@/lib/logger';
import type { SQLiteResponse } from '@/common/types';
import { generateId } from '../util';
import { DatabaseHelper } from '../model/databaseHelper';
import HttpStatusCode from '../../common/httpStatusCode';

const QUERY = {
    INSERT_USER: `INSERT INTO user(id, name, passcode, image) VALUES(?,?,?,?)`,
    GET_USERS: `SELECT name, id FROM user`,
    GET_USER_BY_NAME: `SELECT * FROM user WHERE name = ?`,
    GET_USER_BY_ID: `SELECT * FROM user WHERE id = ?`,
};

export async function createUser(_: IpcMainInvokeEvent, data: any) {
    const db = DatabaseHelper.getDb();
    const { name, passcode } = data;
    const runQuery = () => {
        return new Promise<Partial<SQLiteResponse>>((resolve, reject) => {
            db.serialize(() => {
                db.get(QUERY.GET_USER_BY_NAME, [name], (err, row) => {
                    if (err || row) {
                        if (row) {
                            return reject(
                                new Error(
                                    `User with the name "${name}" already exists!`
                                )
                            );
                        }
                        return reject(err);
                    }
                    const userId = generateId(8, 'user');
                    db.run(
                        QUERY.INSERT_USER,
                        [userId, name, passcode],
                        (userGenError) => {
                            if (err) {
                                return reject(userGenError);
                            }
                            return resolve({
                                message: 'User created successfully!',
                                data: {
                                    userId,
                                    name,
                                },
                            });
                        }
                    );
                    return undefined;
                });
            });
        });
    };
    let response;
    try {
        await runQuery()
            .then((result) => {
                response = {
                    status: HttpStatusCode.CREATED,
                    ...result,
                };
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    } catch (err) {
        const message = handleCatchError(err);
        response = {
            status: HttpStatusCode.FORBIDDEN,
            message: `Unable to create user: ${message}`,
        };
    }

    dbLog.info(response);
    return response;
}

export async function getUsers() {
    const db = DatabaseHelper.getDb();
    const runQuery = () => {
        return new Promise<Partial<SQLiteResponse>>((resolve, reject) => {
            db.all(QUERY.GET_USERS, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                return resolve({
                    message: 'Users retrieved successfully!',
                    data: rows,
                });
            });
        });
    };
    let response;
    try {
        await runQuery()
            .then((result) => {
                response = {
                    status: HttpStatusCode.OK,
                    ...result,
                };
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    } catch (err) {
        const message = handleCatchError(err);
        response = {
            status: HttpStatusCode.NOT_FOUND,
            message: `Unable to retrieve users: ${message}`,
        };
    }

    dbLog.info(response);
    return response;
}

export async function loginUser(_: IpcMainInvokeEvent, data: any) {
    const db = DatabaseHelper.getDb();
    const { userId, passcode } = data;
    const runQuery = () => {
        return new Promise<Partial<SQLiteResponse>>((resolve, reject) => {
            db.get(QUERY.GET_USER_BY_ID, [userId], (err, row: any) => {
                if (err) {
                    reject(err);
                }
                if (row?.passcode === passcode) {
                    resolve({
                        message: 'User authenticated successfully!',
                        data: {
                            userId: row.id,
                            name: row.name,
                        },
                    });
                }
                reject(new Error("Passcode doesn't match!"));
            });
        });
    };
    let response;
    try {
        await runQuery()
            .then((result) => {
                response = {
                    status: HttpStatusCode.OK,
                    ...result,
                };
            })
            .catch((err) => {
                throw new Error(err.message);
            });
    } catch (err) {
        const message = handleCatchError(err);
        response = {
            status: HttpStatusCode.NOT_FOUND,
            message: `${message}`,
        };
    }

    dbLog.info(response);
    return response;
}
