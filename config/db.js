const mysql = require("mysql2/promise");
require("dotenv").config();

const mySQLPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,  // Optional: Manage pool behavior
    connectionLimit: 10,       // Optional: Max number of connections
    queueLimit: 0              // Optional: Max queue length for awaiting connections (0 means no limit)
});

module.exports = mySQLPool;
