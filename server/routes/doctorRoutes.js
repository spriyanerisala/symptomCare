import express from "express";
import {
  addDoctor,
  getDoctors,
  getAvailableDoctor
} from "../controllers/doctorController.js";

const router = express.Router();

router.post("/add", addDoctor);
router.get("/get", getDoctors);
router.get("/available/:specialization", getAvailableDoctor);

export default router;
