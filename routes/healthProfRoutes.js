import { Router } from "express";
import healthProfController from "../controllers/healthProfControllers/index.js";
import ensureAuth from "../helpers/ensureAuth.js";

const router = Router();

router.get(
  "/healthprovider/:healthproviderId/patients",
  ensureAuth,
  healthProfController.getPatients
);
export default router;
