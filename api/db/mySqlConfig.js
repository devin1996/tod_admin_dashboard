const msql = require('mysql');

const db = msql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: 'root',
    database: 'tod',
    port    : '3306'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
});

module.exports = db;