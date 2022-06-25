const mysql = require('mysql2')

const mySQLHost = process.env.MYSQL_HOST || 'localhost'
const mySQLPort = process.env.MYSQL_PORT || '3306'
const mySQLUser = process.env.MYSQL_USER || 'root'
const mySQLPass = process.env.MYSQL_PASS || 'enoviaV6'
const mySQLDB = process.env.MYSQL_DB || 'rollup'

const dbConnectOptions = {
  host: mySQLHost,
  port: mySQLPort,
  user: mySQLUser,
  password: mySQLPass,
  database: mySQLDB,
  multipleStatements: true,
}
console.log('MySQL Connection Config :')
console.log(dbConnectOptions)

const mySQLConnection = mysql.createConnection(dbConnectOptions)
mySQLConnection.connect((err) => {
  if (err) {
    console.log('Database Connection Failed')
    throw err
  }
  console.log('Database Connection Successfull')
})

module.exports = mySQLConnection
