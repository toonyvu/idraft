import { Router } from "express";
import { getCharactersController } from "../controllers/characters.controller.js";

const router = Router();

router.get("/", getCharactersController);
export default router;
