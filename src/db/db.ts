import {Pool} from "pg";
import 'dotenv/config';

const pool = new Pool({
  user: process.env.PG_USER as string,
  host: process.env.PG_HOST as string,
  database: process.env.PG_NAME as string,
  password: process.env.PG_PSW as string,
  port: parseInt(process.env.PG_PORT as string, 10)
});

export default pool;
