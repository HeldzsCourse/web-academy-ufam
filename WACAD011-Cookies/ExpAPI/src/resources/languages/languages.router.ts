import Router from "express";
import languageController from "./languages.controller.js";

const router = Router();

router.get("/change", languageController.changeLanguage);

export default router;
