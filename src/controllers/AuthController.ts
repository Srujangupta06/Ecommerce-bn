import { Request, Response } from "express";
import { validateSignUpUser, validateEmailAndOtp } from "../utils/validations/SignUpUser.validate";
import { UserService } from "../services/UserService";
import { BadRequest, Conflict, InternalServerError, NotFound, Unauthorized } from "../errors/Errors";
import * as bcrypt from 'bcryptjs';
import { sendMail } from "../utils/Mailer";
import { generateOTP, setOTPExpiration } from "../utils/GenerateOTP";
import { AuthService } from "../services/AuthService";
import { sendOtpMailTemplate } from "../utils/MailTemplates/MailMessageTemplates";
import { generateToken } from "../utils/helpers";
import { validateSignInUser } from "../utils/validations/SignInUser.validate";
import { validateResendOTP } from "../utils/validations/ResendOtp.validate";



// SIGNUP API
export const signUpUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userService = new UserService();
        const authService = new AuthService();
        const { firstName, lastName, email, password, mobileNumber } = req.body

        // Step 1: Validate the Input Body
        validateSignUpUser({ firstName, lastName, email, password, mobileNumber })

        // Step 2: Check if user already exists
        const user = await userService.getUserByEmail(email);
        if (user) {
            throw new Conflict('User already exists')
        }

        // Step 3: Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Step 3: Send OTP via Mail
        const generatedOTP = generateOTP(6);
        if (!generatedOTP) throw new InternalServerError('Failed to generate OTP')
        const otpExpiresAt = setOTPExpiration(); // OTP Expires in 1 minute

        const info = await sendMail(email, "OTP Verification", sendOtpMailTemplate(firstName, generatedOTP));
        if (!info) throw new InternalServerError('Failed to send mail')


        // Step 4: Create User
        const newUser = await authService.signUpUser({ firstName, lastName, email, password: hashedPassword, mobileNumber, otp: generatedOTP, otpExpiresAt });
        if (!newUser) throw new InternalServerError('Failed to create user')


        // Step 5: Send Response
        res.json({ message: "OTP sent successfully to your email" })
    }
    catch (e: any) {
        res.status(e.statusCode).json(e)
    }
}


// OTP VERIFICATION API
export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, otp } = req.body;
        validateEmailAndOtp(email, otp)
        const userService = new UserService();

        const user = await userService.getUserByEmail(email);

        if (!user) throw new NotFound('User not found')

        // Check OTP Expired or not
        if(user.isVerified){
            throw new BadRequest('User already registered')
        }

        const isOTPExpired = user.otpExpiresAt < new Date();
        if (isOTPExpired) {
            await userService.updateOTPStatus(user._id, { otp: null, otpExpiresAt: null, isVerified: false });
            throw new BadRequest('OTP Expired')
        }

        // Verify OTP

        if (user.otp !== otp) {
            throw new BadRequest('Invalid OTP')
        }

        // Update User Status to Verified
        const updatedUser = await userService.updateOTPStatus(user._id, { otp: null, otpExpiresAt: null, isVerified: true });
        if (!updatedUser) throw new InternalServerError('OTP Verification Failed')

        // Generate JWT Token
        const token = generateToken({ id: user._id, email, role: user.role })

        // Send Response
        res.json({
            message: "User Registered Successfully",
            token
        })

    }
    catch (e: any) {
        res.status(e.statusCode).json(e)
    }
}


// LOGIN API
export const signInUser = async (request: Request, response: Response): Promise<any> => {
    try {
        const { email, password } = request.body
        validateSignInUser({ email, password })
        const loginService = new UserService()
        const user = await loginService.getUserValidEmail(email);
        if (!user) {
            throw new NotFound("User not found")
        }
        const hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) {
            throw new Unauthorized("Invalid password")
        }
        const token = generateToken({ id: user._id, email })
        response.json({
            message: "User Successfully Logedin",
            token,
        })

    } catch (error: any) {
        response.status(error.statusCode).json(error)
    }
}


// RESEND OTP API FOR OTP EXPIRATION
export const resendOtp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email } = req.body;
        // Validate the Req Body
        validateResendOTP(email);

        const userService = new UserService();

        // Find the User Status
        const user = await userService.getUserByEmail(email);
        if (!user) {
            throw new NotFound("User not found")
        }

        // If User already verified then throw error
        if (user.isVerified) {
            throw new BadRequest('User already verified')
        }

        const isOTPExpired = user.otpExpiresAt < new Date();

        // If OTP is not expired then throw error
        if (!isOTPExpired) {
            throw new Conflict('Already OTP Sent to your registered email');
        }
        const generatedOTP = generateOTP(6);

        // If OTP generation failed then throw error
        if (!generatedOTP) throw new InternalServerError('Failed to generate OTP')

        // Set OTP Expiration for generated OTP
        const otpExpiresAt = setOTPExpiration();

        const info = await sendMail(email, "OTP Verification", sendOtpMailTemplate(user.firstName, generatedOTP));

        // If Mail sending failed then throw error
        if (!info) {
            throw new InternalServerError('Failed to send OTP via Mail');
        }

        const updatedUser = await userService.updateOTPStatus(user._id, { otp: generatedOTP, otpExpiresAt, isVerified: false });

        //If Failed to  Update the User Status then throw error
        if (!updatedUser) {
            throw new InternalServerError('Failed to Resend OTP');
        }

        // Send Response
        res.json({ message: "OTP sent successfully to your registered email" })
    }
    catch (e: any) {
        res.status(e.statusCode).json(e);
    }
}


// FORGOT PASSWORD API



// RESET PASSWORD API