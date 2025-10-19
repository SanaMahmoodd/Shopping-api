# Shopping API Requirements

## 1. Database Schema

### Users

| Column     | Type      |
| ---------- | --------- |
| id         | SERIAL PK |
| username   | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| created_at | TIMESTAMP |

### Products

| Column      | Type      |
| ----------- | --------- |
| id          | SERIAL PK |
| name        | VARCHAR   |
| description | TEXT      |
| price       | NUMERIC   |
| created_at  | TIMESTAMP |

### Orders

| Column              | Type       |
| ------------------- | ---------- |
| id                  | SERIAL PK  |
| user_id             | INTEGER FK |
| total               | NUMERIC    |
| status              | VARCHAR    |
| shipping_address_id | INTEGER    |
| created_at          | TIMESTAMP  |

### order_products

| Column     | Type       |
| ---------- | ---------- |
| id         | SERIAL PK  |
| order_id   | INTEGER FK |
| product_id | INTEGER FK |
| quantity   | INTEGER    |
| unit_price | NUMERIC    |
| created_at | TIMESTAMP  |

(العلاقة: كل طلب يمكن أن يحتوي على منتجات متعددة، وكل منتج يمكن أن يتبع لعدة طلبات — many-to-many relationship.)

---

## 2. API Endpoints

### Users

* `POST /users` → create a new user
* `GET /users` → get all users
* `GET /users/:id` → get user by id
* `PUT /users/:id` → update user
* `DELETE /users/:id` → delete user

### Auth

* `POST /auth/login` → login user, returns JWT token
* `POST /auth/register` → register new user

### Products

* `GET /products` → list all products
* `GET /products/:id` → get product by id
* `POST /products` → create product
* `PUT /products/:id` → update product
* `DELETE /products/:id` → delete product

### Orders

* `GET /orders` → list all orders
* `GET /orders/:id` → get order by id
* `POST /orders` → create order
* `PUT /orders/:id` → update order
* `DELETE /orders/:id` → delete order
* `POST /orders/:id/products` → add product to an order
* `GET /orders/:id/products` → list all products in an order

---

## 3. Test Environment

* Create a separate PostgreSQL database for testing (`shop_db_test`).
* In `.env.test`:

```
POSTGRES_DB=shop_db_test
POSTGRES_USER=shop_user
POSTGRES_PASSWORD=shop_pass
PORT=3001
```

* Configure tests in Jasmine to connect to this database.

---

## 4. Notes

* All passwords are hashed with `bcrypt`.
* JWT tokens are used for user authentication.
* Make sure Docker is running before starting the project.
