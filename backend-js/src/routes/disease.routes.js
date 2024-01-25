import { Router } from "express";
import { diseasePrediction, orderValidate, paymentGateway  } from "../controllers/disease.controllers.js";

const router = Router()

router.route('/disease-predict').post(diseasePrediction)
router.route("/payment").post(paymentGateway )
router.route("/order-validate").post(orderValidate)

export default router