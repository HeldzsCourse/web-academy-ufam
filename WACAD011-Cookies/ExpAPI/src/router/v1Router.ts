import productsRouter from "../resources/products/products.router.js";
import languagesRouter from "../resources/languages/languages.router.js";
import usersRouter from "../resources/users/users.router.js";
import authRouter from "../resources/auth/auth.router.js";
import purchasesRouter from "../resources/purchases/purchases.router.js";
import { Router } from "express";

const router = Router();

router.use(
  "/products",
  // #swagger.tags = ['Product']
  productsRouter
);
router.use(
  "/languages",
  // #swagger.tags = ['Language']
  languagesRouter
);
router.use(
  "/users",
  // #swagger.tags = ['User']
  usersRouter
);
router.use(
  "/auth",
  // #swagger.tags = ['Auth']
  authRouter
);
router.use(
  "/purchases",
  // #swagger.tags = ['Cart']
  purchasesRouter
);

export default router;
