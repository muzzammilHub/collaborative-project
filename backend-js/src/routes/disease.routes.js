import { Router } from "express";
import { diseasePrediction } from "../controllers/disease.controllers.js";

const router = Router()

router.route('/disease-predict').post(diseasePrediction)

export default router