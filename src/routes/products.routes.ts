import express from 'express';
import { ProductModel } from '../models/product.model';
import { requireAuth, requireAdmin } from '../middleware/auth.middleware';

const router = express.Router();
const pm = new ProductModel();

router.get('/', async (req, res) => {
  const products = await pm.index();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await pm.show(Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const product = await pm.create(req.body);
  res.status(201).json(product);
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const product = await pm.update(Number(req.params.id), req.body);
  res.json(product);
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await pm.delete(Number(req.params.id));
  res.status(204).end();
});

export default router;