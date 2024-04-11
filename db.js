const config = require('./config/config.js');
console.log(process.env.PORT)
const { Pool } = require('pg');
const pool = new Pool({
    user: config.db.user,
    host: config.db.host,
    database: config.db.database,
    password: config.db.password,
    port: config.db.port,
    ssl: true
});



module.exports = {
    query: (text, params) => pool.query(text, params),
};
