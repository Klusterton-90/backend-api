import { Router } from "express";
import healthProfController from "../controllers/healthProfControllers";

const router = Router();

router.get(
  "/healthprovider/:healthproviderId/patients",
  healthProfController.getPatients
);
