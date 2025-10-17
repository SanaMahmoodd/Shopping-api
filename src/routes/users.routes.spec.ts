import request from 'supertest';
import app from '../server.app';


describe('Users API', () => {
it('should signup a new user', async () => {
const res = await request(app).post('/api/users').send({ first_name:'T', last_name:'U', email: 'api_test@example.com', password: 'password1' });
expect(res.status).toBe(201);
});


it('should login and receive token', async () => {
const res = await request(app).post('/api/users/login').send({ email: 'api_test@example.com', password: 'password1' });
expect(res.status).toBe(200);
expect(res.body.token).toBeTruthy();
});
});