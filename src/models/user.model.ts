import pool from '../db';
import bcrypt from 'bcrypt';


export type User = {
id?: number;
first_name: string;
last_name: string;
email: string;
password?: string;
is_admin?: boolean;
};


const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;


export class UserModel {
async create(user: User) {
const client = await pool.connect();
try {
const hash = await bcrypt.hash(user.password as string, SALT_ROUNDS);
const sql = `INSERT INTO users (first_name,last_name,email,password_hash,is_admin) VALUES ($1,$2,$3,$4,$5) RETURNING id, first_name, last_name, email, is_admin, created_at`;
const res = await client.query(sql, [user.first_name, user.last_name, user.email, hash, user.is_admin || false]);
return res.rows[0];
} finally {
client.release();
}
}


async authenticate(email: string, plainPassword: string) {
const client = await pool.connect();
try {
const res = await client.query('SELECT id, password_hash, first_name, last_name, email, is_admin FROM users WHERE email=$1', [email]);
if (res.rowCount === 0) return null;
const user = res.rows[0];
const match = await bcrypt.compare(plainPassword, user.password_hash);
if (!match) return null;
delete user.password_hash;
return user;
} finally {
client.release();
}
}


async findById(id: number) {
const res = await pool.query('SELECT id, first_name, last_name, email, is_admin, created_at FROM users WHERE id=$1', [id]);
return res.rows[0] || null;
}
}