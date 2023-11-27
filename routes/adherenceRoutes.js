import { Router } from "express";
import adherenceControllers from "../controllers/adherenceControllers/index.js";
import ensureAuth from "../helpers/ensureAuth.js";

const router = Router();

router.get("/:healthProfId/adherence", ensureAuth, adherenceControllers.getAllAdherence);
router.get("/get/:userId/adherence", ensureAuth, adherenceControllers.getAdherence);
router.post("/:userId/addAdherence", ensureAuth, adherenceControllers.addAdherence);

export default router