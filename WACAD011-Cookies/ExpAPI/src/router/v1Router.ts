import productsRouter from "../resources/products/products.router.js";
import languagesRouter from "../resources/languages/languages.router.js";
import { Router } from "express";

const router = Router();

router.use("/products", productsRouter);
router.use("/languages", languagesRouter);

export default router;
