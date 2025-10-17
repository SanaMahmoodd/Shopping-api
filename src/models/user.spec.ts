import { UserModel } from '../../src/models/user.model';


describe('UserModel', () => {
const um = new UserModel();
let userId: number;


it('should create a user', async () => {
const user = await um.create({ first_name: 'Test', last_name: 'User', email: 'test@example.com', password: 'pass123' });
expect(user).toBeDefined();
expect(user.email).toBe('test@example.com');
userId = user.id;
});


it('should authenticate the user', async () => {
const auth = await um.authenticate('test@example.com', 'pass123');
expect(auth).toBeDefined();
expect(auth.email).toBe('test@example.com');
});


it('should find by id', async () => {
const u = await um.findById(userId);
expect(u).toBeDefined();
expect(u.id).toBe(userId);
});
});