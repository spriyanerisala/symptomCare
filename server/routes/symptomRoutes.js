import express from "express";
import { checkSymptoms } from "../controllers/symptomController.js";
import { aiSymptomCheck } from "../controllers/aiSymptomController.js";

const router = express.Router();

router.post("/check", checkSymptoms);
router.post('/check-ai-symptoms',aiSymptomCheck);
export default router;
