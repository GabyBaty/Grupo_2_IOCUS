require('dotenv').config();
module.exports={
  "development": {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "iocus_db",
    host: "127.0.0.1",
    dialect: "mysql",
    port:process.env.DB_PORT

  },
  "test": {
    username: "root",
    password: "root",
    database: "iocus_db",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  "production": {
    username: "root",
    password:"root",
    database: "databaiocus_db",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}
