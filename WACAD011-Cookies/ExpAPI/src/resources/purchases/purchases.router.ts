import { Router } from "express";
import * as PurchaseController from "./purchases.controller";
import validate from "../../middlewares/validate";
import isAuth from "../../middlewares/isAuth";
import { purchaseItemSchema } from "./purchases.schema";

const router = Router();

router.use(isAuth);

router.post(
  "/cart",
  validate(purchaseItemSchema),
  PurchaseController.addToCart
);
router.get("/cart", PurchaseController.getCart);
router.post("/checkout", PurchaseController.checkout);

export default router;
