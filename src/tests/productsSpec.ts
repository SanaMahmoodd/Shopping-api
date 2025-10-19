import supertest from 'supertest';
import app from '../server.app';
import { ProductModel } from '../models/product.model';

const request = supertest(app);
const productModel = new ProductModel();

describe('🧩 Product Model', () => {
it('should create a product', async () => {
const product = await productModel.create({
name: 'Laptop',
description: 'Test laptop',
price: 2000,
stock: 10,
});
expect(product.name).toBe('Laptop');
});

it('should return list of products', async () => {
const products = await productModel.index();
expect(products.length).toBeGreaterThan(0);
});

it('should return a single product by ID', async () => {
const product = await productModel.show(1);
expect(product.id).toBeDefined();
});
});

describe('🧪 Product Endpoints', () => {
it('GET /products should return 200', async () => {
const res = await request.get('/products');
expect(res.status).toBe(200);
});

it('POST /products should create new product', async () => {
const res = await request
.post('/products')
.send({ name: 'Phone', description: 'Test phone', price: 800 });
expect(res.status).toBe(200);
});
});
