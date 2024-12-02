import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10749069',
    password: 'dcnKXmEYTK',
    database: 'sql10749069'
});

export default db;