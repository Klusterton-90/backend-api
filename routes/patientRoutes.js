import { Router } from "express";
import patientController from "../controllers/patientControllers/index.js";


const router = Router();

router.post('/:userId/create', patientController.addMed)

router.get('/:userId/reminders', patientController.getMeds)

router.get('/:id/reminder', patientController.getMed)

router.delete('/delete/:id', patientController.deleteMed)

router.put('/update/:id', patientController.updateMed)

export default router;