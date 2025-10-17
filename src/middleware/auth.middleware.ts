import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/auth.service';


export interface AuthRequest extends Request {
user?: any;
}


export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
const authHeader = req.headers.authorization as string | undefined;
if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });
const token = authHeader.split(' ')[1];
if (!token) return res.status(401).json({ error: 'Invalid Authorization header' });
const payload = verifyToken(token);
if (!payload) return res.status(401).json({ error: 'Invalid token' });
req.user = payload;
next();
}


export function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
if (!req.user || !req.user.is_admin) return res.status(403).json({ error: 'Admin privileges required' });
next();
}