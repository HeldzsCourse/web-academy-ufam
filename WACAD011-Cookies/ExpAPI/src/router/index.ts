import { Router } from "express";
import v1Router from "../router/v1Router.js";

const router = Router();

router.use("/v1", v1Router);

export default router;
