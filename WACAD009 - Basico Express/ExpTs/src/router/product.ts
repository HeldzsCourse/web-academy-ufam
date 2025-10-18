import { Router } from "express";
import productController from "../controllers/product";

const router = Router();

router.get("/product", productController.index);
router.all("/product/create", productController.create);
router.get("/product/:id", productController.read);
router.all("/product/:id/update", productController.update);
router.post("/product/:id/delete", productController.remove);

export default router;