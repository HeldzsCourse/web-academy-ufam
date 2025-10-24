import { Router } from "express";
import productsController from "./products.controller.js";
import validate from "../../middlewares/validate.js";
import productSchema from "./products.schema.js";

const router = Router();

router.get("/", productsController.index);
router.post("/", validate(productSchema), productsController.create);
router.get("/:id", productsController.read);
router.put("/:id", productsController.update);
router.delete("/:id", productsController.remove);

export default router;
