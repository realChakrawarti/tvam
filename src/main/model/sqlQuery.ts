export const QUERY = {
    INSERT_USER: `INSERT INTO user VALUES(?,?,?,?)`,
};

// Table Queries

export const TABLE_QUERIES = [
    {
        name: 'User',
        sql: `CREATE TABLE IF NOT EXISTS 
        user(id TEXT NOT NULL UNIQUE,
            name TEXT NOT NULL,
            passcode TEXT NOT NULL,
            image BLOB NULL
        )`,
    },
    {
        name: 'Todo',
        sql: `CREATE TABLE IF NOT EXISTS
        todo(id TEXT NOT NULL UNIQUE,
            item TEXT NOT NULL,
            deadline TEXT NOT NULL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )`,
    },
];
