import { Router } from "express"
import { isAuthenticated } from "../middlewares/authUser.middleware.js"
import { diseasePrediction, orderValidate, paymentGateway, userRegisteration, userLogin, appointmentSchedule, getLoginUser, checkout, paymentVerification, logoutUser, getSpecificUser, deleteAppointment, updateAppointment, specificAppointment, submitFeedback } from "../controllers/user.controllers.js"
import {  getDoctorList } from "../controllers/doctor.controller.js"
import { getAllApointment } from "../controllers/doctor.controller.js"
import { addComment, getComments, getComment } from "../controllers/post.controller.js"

const router = Router()

router.route("/disease-predict").post(diseasePrediction)
router.route("/payment").post(paymentGateway )
router.route("/order-validate").post(orderValidate)
router.route("/user-register").post(userRegisteration)
router.route("/user-login").post(userLogin)
router.route("/appointment").post(isAuthenticated ,appointmentSchedule)
router.route("/update-appointment").post(isAuthenticated, updateAppointment)
router.route("/alldoctor").get(getDoctorList)
router.route("/user").get(isAuthenticated, getLoginUser)
router.route("/checkout").post(checkout)
router.route("/paymentverification").post(paymentVerification)
router.route("/logout").get(isAuthenticated, logoutUser)
router.route("/all-appointment").get(getAllApointment)
router.route("/specific-user").post(getSpecificUser)
router.route("/delete").post(deleteAppointment)
router.route("/specific-appointment").get(isAuthenticated, specificAppointment)



router.route("/myblog/:id/comments").post(isAuthenticated, getComments)
router.route("/myblog/:id/post/:blogId/comment").post(isAuthenticated, addComment)
router.route("/getCaption").post(isAuthenticated, getComment)
router.route("/feedback/:doctorId").post(isAuthenticated, submitFeedback)


export default router