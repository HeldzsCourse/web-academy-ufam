import { Router } from "express";
import productsController from "./products.controller.js";

const router = Router();

router.get("/", productsController.index);
router.post("/", productsController.create);
router.get("/:id", productsController.read);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export default router;