import { IpcMainInvokeEvent } from 'electron/main';
import { QUERY } from '../model/sqlQuery';
import { generateId } from '../util';
import { dbLog } from '@/lib/logger';
import { DatabaseHelper } from '../model/databaseHelper';
import { handleCatchError } from '@/lib/utils';
import { SQLiteResponse } from './types';
import HttpStatusCode from './httpStatusCode';

export async function createUser(_: IpcMainInvokeEvent, data: any) {
    const db = DatabaseHelper.getDb();
    const { name, passcode } = data;
    const runQuery = () => {
        return new Promise<Partial<SQLiteResponse>>((resolve, reject) => {
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
