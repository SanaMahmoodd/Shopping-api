import express, { Request, Response } from "express";
import usersRoutes from "./routes/users.routes";
import productsRoutes from "./routes/products.routes";
import ordersRoutes from "./routes/orders.routes";

const app = express();

// لتفسير JSON
app.use(express.json());

// المسارات
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);

// اختبار بسيط
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running!" });
});

export default app;