import pool from '../db';

export type Order = {
  id?: number;
  user_id: number;
  total: number;
  status?: string;
  shipping_address_id?: number;
};

export class OrderModel {
  async create(o: Order) {
    const res = await pool.query(
      `INSERT INTO orders (user_id, total, status, shipping_address_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [o.user_id, o.total, o.status || 'pending', o.shipping_address_id]
    );
    return res.rows[0];
  }

  async index() {
    const res = await pool.query('SELECT * FROM orders ORDER BY id');
    return res.rows;
  }

  async show(id: number) {
    const res = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
    return res.rows[0];
  }

  async updateStatus(id: number, status: string) {
    const res = await pool.query(
      `UPDATE orders SET status=$1, updated_at=now() WHERE id=$2 RETURNING *`,
      [status, id]
    );
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM orders WHERE id=$1', [id]);
    return true;
  }
}