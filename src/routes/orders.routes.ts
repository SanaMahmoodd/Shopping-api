import express from 'express';
import { OrderModel } from '../models/order.model';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = express.Router();
const om = new OrderModel();

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const orders = await om.index();
  res.json(orders);
});

router.get('/:id', requireAuth, async (req: any, res) => {
  const id = Number(req.params.id);
  const order = await om.show(id);
  if (!order) return res.status(404).json({ error: 'Not found' });
  if (order.user_id !== req.user.id && !req.user.is_admin)
    return res.status(403).json({ error: 'Forbidden' });
  res.json(order);
});

router.post('/', requireAuth, async (req: any, res) => {
  const order = await om.create({ ...req.body, user_id: req.user.id });
  res.status(201).json(order);
});

router.post('/:id/products', requireAuth, async (req: any, res) => {
  const order_id = Number(req.params.id);
  const { product_id, quantity, unit_price } = req.body;
  const added = await om.addProductToOrder({ order_id, product_id, quantity, unit_price });
  res.status(201).json(added);
});

router.get('/:id/products', requireAuth, async (req: any, res) => {
  const products = await om.getProductsForOrder(Number(req.params.id));
  res.json(products);
});

router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const order = await om.updateStatus(Number(req.params.id), req.body.status);
  res.json(order);
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await om.delete(Number(req.params.id));
  res.status(204).end();
});

export default router;