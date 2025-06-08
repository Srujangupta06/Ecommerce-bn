import { Router } from "express";
import { signUpUser, verifyOtp } from "../controllers/AuthController";




const authRouter = Router();


authRouter.post('/sign-up', signUpUser);
authRouter.post('/verify-otp',verifyOtp);

export default authRouter;