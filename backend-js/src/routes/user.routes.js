import { Router } from "express";
import { isAuthenticated } from "../middlewares/authUser.middleware.js"
import { diseasePrediction, orderValidate, paymentGateway, userRegisteration, userLogin, appointmentSchedule } from "../controllers/user.controllers.js";
import {  getDoctorList } from "../controllers/doctor.controller.js";

const router = Router()

router.route("/disease-predict").post(diseasePrediction)
router.route("/payment").post(paymentGateway )
router.route("/order-validate").post(orderValidate)
router.route("/user-register").post(userRegisteration)
router.route("/user-login").post(userLogin)
router.route("/appointment").post(isAuthenticated ,appointmentSchedule)
router.route("/alldoctor").get(getDoctorList)


export default router