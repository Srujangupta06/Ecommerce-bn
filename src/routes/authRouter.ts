import { Router } from "express";
import { signUpUser, verifyOtp,signInUser, resendOtp,forgotPassword, resetPassword } from "../controllers/AuthController";
import { verifyJwtToken } from "../middleware/jwtAuth";



const authRouter = Router();


authRouter.post('/sign-up', signUpUser);
authRouter.post('/verify-otp',verifyOtp);
authRouter.post('/resend-otp',resendOtp);
authRouter.post('/sign-in',signInUser);
authRouter.post('/forgot-password',forgotPassword)
authRouter.post('/reset-password',verifyJwtToken,resetPassword)

export default authRouter;