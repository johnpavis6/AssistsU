var mysql = require('mysql');
module.exports = {
    conn: mysql.createConnection({
        host: 'localhost',
        user: 'user',
        password: 'password',
        database: 'database name'
    }),
};