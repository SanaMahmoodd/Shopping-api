import pool from '../db';

export type Product = {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  sku?: string;
};

export class ProductModel {
  async create(p: Product) {
    const res = await pool.query(
      `INSERT INTO products (name, description, price, stock, sku)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [p.name, p.description, p.price, p.stock, p.sku]
    );
    return res.rows[0];
  }

  async index() {
    const res = await pool.query('SELECT * FROM products ORDER BY id');
    return res.rows;
  }

  async show(id: number) {
    const res = await pool.query('SELECT * FROM products WHERE id=$1', [id]);
    return res.rows[0];
  }

  async update(id: number, p: Partial<Product>) {
    const res = await pool.query(
      `UPDATE products SET name=$1, description=$2, price=$3, stock=$4, sku=$5, updated_at=now()
       WHERE id=$6 RETURNING *`,
      [p.name, p.description, p.price, p.stock, p.sku, id]
    );
    return res.rows[0];
  }

  async delete(id: number) {
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
    return true;
  }
}