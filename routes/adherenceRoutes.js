import { Router } from "express";
import adherenceControllers from "../controllers/adherenceControllers/index.js";

const router = Router();

router.get("/:healthProfId/adherence", adherenceControllers.getAllAdherence);
router.get("/get/:userId/adherence", adherenceControllers.getAdherence);
router.post("/:userId/addAdherence", adherenceControllers.addAdherence);

export default router