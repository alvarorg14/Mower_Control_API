require("dotenv").config();

module.exports = {
  HOST: process.env.MYSQL_HOST || "localhost",
  USER: process.env.MYSQL_USER || "root",
  PASSWORD: process.env.MYSQL_PASSWORD || "password",
  DB: process.env.MYSQL_DB || "mowercontrol",
  PORT: process.env.MYSQL_PORT || 33060,
};
