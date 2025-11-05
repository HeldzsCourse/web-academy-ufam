import productsRouter from "../resources/products/products.router.js";
import languagesRouter from "../resources/languages/languages.router.js";
import usersRouter from "../resources/users/users.router.js";
import authRouter from "../resources/auth/auth.router.js";
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);
router.use("/languages", languagesRouter);
router.use("/users", usersRouter);
router.use("/auth", authRouter);

export default router;
