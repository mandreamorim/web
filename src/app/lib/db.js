import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'web'
});

export default db;