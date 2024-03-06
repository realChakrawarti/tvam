// Table Queries

const TABLE_QUERIES = [
    {
        name: 'User',
        sql: `CREATE TABLE IF NOT EXISTS 
        user(id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            passcode TEXT NOT NULL,
            image BLOB NULL,
            created_at INTEGER DEFAULT (unixepoch('now')), 
            updated_at INTEGER DEFAULT (unixepoch('now'))
        )`,
    },
    {
        name: 'Todo',
        sql: `CREATE TABLE IF NOT EXISTS
        todo(id TEXT NOT NULL UNIQUE,
            item TEXT NOT NULL,
            deadline TEXT NOT NULL,
            created_at INTEGER DEFAULT (unixepoch('now')), 
            updated_at INTEGER DEFAULT (unixepoch('now'))
        )`,
    },
];

export default TABLE_QUERIES;
