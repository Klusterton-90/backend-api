import { Router } from "express";
import healthProfController from "../controllers/healthProfControllers/index.js";

const router = Router();

router.get(
  "/healthprovider/:healthproviderId/patients",
  healthProfController.getPatients
);
export default router;
