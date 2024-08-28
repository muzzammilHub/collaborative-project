import { Router } from "express"
import { isAuthenticated } from "../middlewares/authDoctor.middleware.js"
import { sendPdfByEmail } from "../controllers/pdfSend.controller.js"

const router = Router()


router.route('/pdf-send').post(isAuthenticated, sendPdfByEmail)

export default router