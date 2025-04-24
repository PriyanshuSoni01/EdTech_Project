import express from "express"
const router = express.Router()

import {
    capturePayment,
  // verifySignature,
  verifyPayment,
  sendPaymentSuccessEmail,
} from "../controllers/payment.controller.js"

import { auth, isInstructor, isStudent, isAdmin } from "../middlewares/auth.middleware.js"

router.post("/capturePayment", auth, isStudent, capturePayment)
router.post("/verifyPayment", auth, isStudent, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isStudent,
  sendPaymentSuccessEmail
)
 export default router
