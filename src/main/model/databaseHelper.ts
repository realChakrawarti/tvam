import { dbLog } from '@/lib/logger';
import * as sqlite from 'sqlite3';
import { TABLE_QUERIES } from './sqlQuery';

const sqlite3 = sqlite.verbose();

export type SQLiteDB = sqlite.Database;

export class DatabaseHelper {
    static db: SQLiteDB;

    static async load(databasePath: string): Promise<void> {
        const db = await new Promise<SQLiteDB>((resolve, reject) => {
            const db = new sqlite3.Database(databasePath, (err) => {
                if (err) {
                    dbLog.error(
                        `Connection failed with the database located in: ${databasePath}.`
                    );
                    reject(err);
                }
                dbLog.info(
                    `Connection established with the database located in: ${databasePath}.`
                );
                resolve(db);
            });
        });
        db.run('PRAGMA journal_mode = WAL');

        DatabaseHelper.setDb(db);
    }

    static setDb(db: SQLiteDB) {
        DatabaseHelper.db = db;
    }

    static getDb() {
        return DatabaseHelper.db;
    }

    static async initDb(databasePath: string) {
        await DatabaseHelper.load(databasePath);
        DatabaseHelper.initTables();
    }

    static initTables() {
        DatabaseHelper.db.parallelize(() => {
            TABLE_QUERIES.forEach(({ name, sql }) => {
                DatabaseHelper.db.run(sql, (err) => {
                    if (err) return dbLog.error(err.message);
                    return dbLog.info(`${name} table created successfully.`);
                });
            });
        });
    }

    static closeDatabase() {
        if (DatabaseHelper.db) {
            DatabaseHelper.db.close((err) => {
                if (err)
                    return dbLog.error(
                        'Failed to disconnect with the database!'
                    );
                return dbLog.info('Gracefully closed database connection.');
            });
        }
    }
}
