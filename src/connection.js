const { createPool } = require('mysql2')


const pool = createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'aula_express',
})

const promisePool = pool.promise()

module.exports = promisePool
