import { Router } from "express";
import { signUpUser, verifyOtp,signInUser } from "../controllers/AuthController";




const authRouter = Router();


authRouter.post('/sign-up', signUpUser);
authRouter.post('/verify-otp',verifyOtp);
authRouter.post('/sign-in',signInUser);

export default authRouter;