require('dotenv').config()
const fs = require('fs')
const mysql = require('mysql2/promise')

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const migrate = async () => {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, MYSQL_ROOT_PASSWORD } = process.env
  const isProduction = process.env.NODE_ENV === 'production'

  let connection

  let retries = 10

  while (retries > 0) {
    try {
      connection = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: isProduction ? DB_USER : 'root',
        password: isProduction ? DB_PASSWORD : MYSQL_ROOT_PASSWORD,
        multipleStatements: true,
      })
      break
    } catch (err) {
      console.log(`DB not ready, retrying... (${retries} attempts left)`)
      retries--
      await wait(3000)
    }
  }

  if (!connection) {
    console.error('Could not connect to database.')
    process.exit(1)
  }

  if (!isProduction) {
    await connection.query(`DROP DATABASE IF EXISTS ${DB_NAME}`)
    await connection.query(`CREATE DATABASE ${DB_NAME}`)
  }

  await connection.query(`USE ${DB_NAME}`)

  const sql = fs.readFileSync('./database/schema.sql', 'utf8')
  await connection.query(sql)

  await connection.end()
  console.log('Migration done !')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
