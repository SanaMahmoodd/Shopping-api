import supertest from 'supertest';
import app from '../server.app';
import { OrderModel } from '../models/order.model';

const request = supertest(app);
const orderModel = new OrderModel();

describe('📦 Order Model', () => {
it('should create an order', async () => {
const order = await orderModel.create({
user_id: 1,
total: 100,
status: 'active',
});
expect(order.status).toBe('active');
});

it('should list all orders', async () => {
const orders = await orderModel.index();
expect(orders.length).toBeGreaterThan(0);
});

it('should get a single order', async () => {
const order = await orderModel.show(1);
expect(order.id).toBeDefined();
});

it('should update an order status', async () => {
const order = await orderModel.updateStatus(1, 'completed');
expect(order.status).toBe('completed');
});
});

describe('🧪 Order Endpoints', () => {
it('GET /orders should return 200', async () => {
const res = await request.get('/orders');
expect(res.status).toBe(200);
});

it('POST /orders should create order', async () => {
const res = await request
.post('/orders')
.send({ user_id: 1, total: 100, status: 'active' });
expect(res.status).toBe(200);
});
});
