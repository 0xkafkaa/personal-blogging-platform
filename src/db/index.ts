import pg from "pg";
import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const db = drizzle({ client: pool });

export default db;
