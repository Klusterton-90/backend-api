import { Router } from "express";
import adherenceControllers from "../controllers/adherenceControllers";

const router = Router();

router.get("/:healthprofId/adherence", adherenceControllers.getAllAdherence);
router.get("/:userId/adherence", adherenceControllers.getAdherence);
router.post("/addAdherence", adherenceControllers.addAdherence);
