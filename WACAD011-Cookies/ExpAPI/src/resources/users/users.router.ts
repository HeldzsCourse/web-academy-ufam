import { Router } from "express";
import usersController from "./users.controller";

const router = Router();

router.get("/", usersController.index);
router.post("/", usersController.create);
router.get("/:id", usersController.read);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;

// const router = Router();

// router.get("/", productsController.index);
// router.post("/", validate(productSchema), productsController.create);
// router.get("/:id", productsController.read);
// router.put("/:id", productsController.update);
// router.delete("/:id", productsController.remove);

// export default router;
