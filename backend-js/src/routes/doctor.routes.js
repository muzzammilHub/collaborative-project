import { Router } from "express";
import { doctorRegisteration, findDoctor, getDoctorDetail } from "../controllers/doctor.controller.js";
import { upload } from "../middlewares/muter.middleware.js";

const router = Router()

router.route("/registeration").post(
    upload.single("avatar"),
    doctorRegisteration
)
router.route("/find-doctor").post(findDoctor)
router.route("/doctor-detail").post(getDoctorDetail)

export default router