import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  // host: process.env.DB_HOST,
  // user: process.env.DB_USER,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASS,
  // port: process.env.DB_PORT,
});

export default db;
