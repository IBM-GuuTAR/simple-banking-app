import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  user: process.env.DB_USER || "simplebankuser",
  password: process.env.DB_PASS || "simplebankpass",
  database: process.env.DB_NAME || "simplebank",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
