
---

## 2️⃣ REQUIREMENTS.md (مثال كامل)

```markdown
# Shopping API Requirements

## 1. Database Schema

### Users
| Column       | Type       |
| ------------ | ---------- |
| id           | SERIAL PK  |
| username     | VARCHAR    |
| email        | VARCHAR    |
| password     | VARCHAR    |
| created_at   | TIMESTAMP  |

### Products
| Column       | Type       |
| ------------ | ---------- |
| id           | SERIAL PK  |
| name         | VARCHAR    |
| description  | TEXT       |
| price        | NUMERIC    |
| created_at   | TIMESTAMP  |

### Orders
| Column       | Type       |
| ------------ | ---------- |
| id           | SERIAL PK  |
| user_id      | INTEGER FK |
| product_id   | INTEGER FK |
| quantity     | INTEGER    |
| total_price  | NUMERIC    |
| created_at   | TIMESTAMP  |

---

## 2. API Endpoints

### Users
- `POST /users` → create a new user
- `GET /users` → get all users
- `GET /users/:id` → get user by id
- `PUT /users/:id` → update user
- `DELETE /users/:id` → delete user

### Auth
- `POST /auth/login` → login user, returns JWT token
- `POST /auth/register` → register new user

### Products
- `GET /products` → list all products
- `GET /products/:id` → get product by id
- `POST /products` → create product
- `PUT /products/:id` → update product
- `DELETE /products/:id` → delete product

### Orders
- `GET /orders` → list all orders
- `GET /orders/:id` → get order by id
- `POST /orders` → create order
- `PUT /orders/:id` → update order
- `DELETE /orders/:id` → delete order

---

## 3. Test Environment

- Create a separate PostgreSQL database for testing (`shop_db_test`).  
- In `.env.test`:

