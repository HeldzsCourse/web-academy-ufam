import { Router } from "express";
import usersController from "./users.controller";
import validate from "../../middlewares/validate";
import userSchema from "./users.schema";

const router = Router();

router.get("/", usersController.index);
router.post("/", validate(userSchema), usersController.create);
router.get("/:id", usersController.read);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.remove);

export default router;
