import { Router } from "express";
import productsController from "./products.controller.js";
import validate from "../../middlewares/validate.js";
import productSchema from "./products.schema.js";
import isAdmin from "../../middlewares/isAdmin.js";
import isAuth from "../../middlewares/isAuth.js";

const router = Router();

router.get("/", isAuth, productsController.index);
router.post("/", isAdmin, validate(productSchema), productsController.create);
router.get("/:id", isAuth, productsController.read);
router.put("/:id", isAdmin, productsController.update);
router.delete("/:id", isAdmin, productsController.remove);

export default router;
