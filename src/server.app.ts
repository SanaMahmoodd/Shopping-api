import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.routes';
import productsRoutes from './routes/products.routes';
import ordersRoutes from './routes/orders.routes';

const app = express();
app.use(bodyParser.json());

app.use('/api/users', usersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/', (req, res) => res.json({ status: 'ok' }));

export default app;