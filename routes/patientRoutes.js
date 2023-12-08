import { Router } from "express";
import patientController from "../controllers/patientControllers/index.js";
import ensureAuth from "../helpers/ensureAuth.js";


const router = Router();

router.post('/:userId/create', ensureAuth, patientController.addMed)

router.get('/:userId/reminders', ensureAuth, patientController.getMeds)

router.get('/:id/reminder', ensureAuth, patientController.getMed)

router.delete('/delete/:id', ensureAuth, patientController.deleteMed)

router.put('/update/:id', ensureAuth, patientController.updateMed)

export default router;