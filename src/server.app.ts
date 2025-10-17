import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.routes';


const app = express();
app.use(bodyParser.json());


app.use('/api/users', usersRoutes);


app.get('/', (req, res) => res.json({ status: 'ok' }));


export default app;