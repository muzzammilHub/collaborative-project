import { Router } from "express";
import { doctorRegisteration, findDoctor, getDoctorDetail, doctorLogin, imageUpload, getAllApointment } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/muter.middleware.js";
import { isAuthenticated } from "../middlewares/authDoctor.middleware.js";

const router = Router()

router.route("/registeration").post(doctorRegisteration)
router.route("/image-upload").post(
upload.single("avatar"),
imageUpload
)
router.route("/find-doctor").post(findDoctor)
router.route("/doctor-detail").post(getDoctorDetail)
router.route("/doctor-login").post(doctorLogin)
router.route("/all-appointment").get(isAuthenticated, getAllApointment)

export default router