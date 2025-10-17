import express from 'express';
import { UserModel } from '../models/user.model';
import { generateToken } from '../services/auth.service';
import { requireAuth } from '../middleware/auth.middleware';


const router = express.Router();
const um = new UserModel();


router.post('/', async (req, res) => {
try {
const created = await um.create(req.body);
res.status(201).json(created);
} catch (err: any) {
res.status(400).json({ error: err.message });
}
});


router.post('/login', async (req, res) => {
try {
const user = await um.authenticate(req.body.email, req.body.password);
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const token = generateToken({ id: user.id, email: user.email, is_admin: user.is_admin });
res.json({ token, user });
} catch (err: any) {
res.status(500).json({ error: err.message });
}
});


router.get('/:id', requireAuth, async (req: any, res) => {
const id = Number(req.params.id);
if (req.user.id !== id && !req.user.is_admin) return res.status(403).json({ error: 'Forbidden' });
const user = await um.findById(id);
res.json(user);
});


export default router;