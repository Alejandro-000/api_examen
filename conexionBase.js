
const mysql = require('mysql');

module.exports = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: 'database_examen'
    })
};



