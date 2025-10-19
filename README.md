This project is a RESTful API for an online shopping application built with Node.js, Express, TypeScript, and PostgreSQL. It handles user authentication, products, and orders.

## 🚀 Project Setup

### 1. Install Packages

```bash
npm install
```

Packages used:
express
pg
dotenv
bcrypt
jsonwebtoken
cors
typescript
ts-node
tsc-watch
jasmine
supertest
@types packages for TypeScript

---

### 2. Environment Variables
Create a .env file in the root directory with the following:

```bash
POSTGRES_HOST=localhost
POSTGRES_DB=shop_db
POSTGRES_USER=shop_user
POSTGRES_PASSWORD=shop_pass
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=3000
```
---

### 3. Local Setup (Without Docker)
1. Install PostgreSQL locally and create a database named `shop_db`.
2. Create a PostgreSQL user:
```bash
CREATE USER shop_user WITH PASSWORD 'shop_pass';
GRANT ALL PRIVILEGES ON DATABASE shop_db TO shop_user;
```
3. Copy `.env.example` → `.env` and update values if needed.
4. Run migration:
```bash
npm run migrate:up
```
5. Start the server:
```bash
npm run dev
```

---

### 4. Start Server
```bash
npm run watch
```
Server will run on:
```bash
http://localhost:3000
```
Database port:
```bash
5432
```
---

### 5. Test Environment
Run tests with:
```bash
npm run test
```
Note: Tests use a separate database (shop_db_test) to prevent affecting development data.

---

### 6. File Structure
```bash
src/
  controllers/
  models/
  routes/
  services/
  migrations/
  server.app.ts
  ```