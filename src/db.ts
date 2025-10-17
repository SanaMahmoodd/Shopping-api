import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
connectionString: process.env.DATABASE_URL,
host: process.env.PGHOST,
port: process.env.PGPORT ? parseInt(process.env.PGPORT) : undefined,
database: process.env.PGDATABASE,
user: process.env.PGUSER,
password: process.env.PGPASSWORD
});


export default pool;