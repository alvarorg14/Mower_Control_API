const mysql = require("mysql");
const dbConfig = require("./db.config.ts");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

//Open the MySQL connection
connection.connect((error: any) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
