const Sequelize = require("sequelize");
const db = process.env.DB_NAME;
const user = process.env.DB_USER;
const pw = process.env.DB_PW;

require("dotenv").config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(db, user, pw, {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  });
}

module.exports = sequelize;
