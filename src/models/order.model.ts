import pool from '../db';

export type Order = {
id?: number;
user_id: number;
total: number;
status?: string;
shipping_address_id?: number;
};

export type OrderProduct = {
id?: number;
order_id: number;
product_id: number;
quantity: number;
unit_price: number;
};

export class OrderModel {
// إنشاء طلب جديد
async create(o: Order) {
const res = await pool.query(
`INSERT INTO orders (user_id, total, status, shipping_address_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
[o.user_id, o.total, o.status || 'pending', o.shipping_address_id]
);
return res.rows[0];
}

// عرض كل الطلبات
async index() {
const res = await pool.query('SELECT * FROM orders ORDER BY id');
return res.rows;
}

// عرض تفاصيل طلب واحد
async show(id: number) {
const res = await pool.query('SELECT * FROM orders WHERE id=$1', [id]);
return res.rows[0];
}

// تحديث حالة الطلب
async updateStatus(id: number, status: string) {
const res = await pool.query(
`UPDATE orders SET status=$1, updated_at=now() WHERE id=$2 RETURNING *`,
[status, id]
);
return res.rows[0];
}

// حذف طلب
async delete(id: number) {
await pool.query('DELETE FROM orders WHERE id=$1', [id]);
return true;
}

// إضافة منتج إلى طلب (جدول الربط order_products)
async addProductToOrder(op: OrderProduct) {
const res = await pool.query(
`INSERT INTO order_products (order_id, product_id, quantity, unit_price)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
[op.order_id, op.product_id, op.quantity, op.unit_price]
);
return res.rows[0];
}

// عرض المنتجات الموجودة داخل طلب معيّن
async getProductsForOrder(orderId: number) {
const res = await pool.query(
`SELECT p.id, p.name, op.quantity, op.unit_price
       FROM order_products op
       JOIN products p ON op.product_id = p.id
       WHERE op.order_id = $1`,
[orderId]
);
return res.rows;
}
}