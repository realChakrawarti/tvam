import type { IpcMainInvokeEvent } from 'electron/main';
import { handleCatchError } from '@/lib/utils';
import { dbLog } from '@/lib/logger';
import { generateId } from '../util';
import { DatabaseHelper } from '../model/databaseHelper';
import type { SQLiteResponse } from './types';
import HttpStatusCode from './httpStatusCode';

const QUERY = {
    INSERT_USER: `INSERT INTO user(id, name, passcode, image) VALUES(?,?,?,?)`,
    GET_USERS: `SELECT name, id FROM user`,
    GET_USER_BY_NAME: `SELECT * FROM user WHERE name = ?`,
};

export async function createUser(_: IpcMainInvokeEvent, data: any) {
    const db = DatabaseHelper.getDb();
    const { name, passcode } = data;
    const runQuery = () => {
        return new Promise<Partial<SQLiteResponse>>((resolve, reject) => {
            db.serialize(() => {
                let userExists;
                db.get(QUERY.GET_USER_BY_NAME, [name], (err, row) => {
                    if (err || row) {
                        userExists = true;
                        if (row) {
                            return reject(
                                new Error(
                                    `User with the name "${name}" already exists!`
                                )
                            );
                        }
                        return reject(err);
                    }
                    userExists = false;
                    return undefined;
                });
                if (!userExists) {
                    db.run(
                        QUERY.INSERT_USER,
                        [generateId(8, 'user'), name, passcode],
                        (err) => {
                            if (err) {
                                return reject(err);
                            }
                            return resolve({
                                message: 'User created successfully!',
                            });
                        }
                    );
                }
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
            status: 400,
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
            status: 400,
            message: `Unable to retrieve users: ${message}`,
        };
    }

    dbLog.info(response);
    return response;
}
