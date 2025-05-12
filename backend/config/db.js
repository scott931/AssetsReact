const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // default WAMP MySQL username
  password: '',  // default WAMP MySQL password is empty
  database: 'assets',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Convert pool to use promises
const promisePool = pool.promise();

module.exports = promisePool;