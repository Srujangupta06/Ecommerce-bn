import { Request, Response } from "express";
import { validateSignUpUser, validateEmailAndOtp } from "../utils/validations/SignUpUser.validate";
import { UserService } from "../services/UserService";
import { BadRequest, Conflict, InternalServerError, NotFound } from "../errors/Errors";
import * as bcrypt from 'bcryptjs'
import { sendMail } from "../utils/Mailer";
import { generateOTP, setOTPExpiration } from "../utils/GenerateOTP";
import { AuthService } from "../services/AuthService";
import { sendOtpMailTemplate } from "../utils/MailMessageTemplates";
import { generateToken } from "../utils/helpers";

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
        const otpExpiresAt = setOTPExpiration(); // OTP Expires in 2 minutes

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

export const verifyOtp = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, otp } = req.body;
        validateEmailAndOtp(email, otp)
        const userService = new UserService();

        const user = await userService.getUserByEmail(email);

        if (!user) throw new NotFound('User not found')

        // Check OTP Expired or not

        const isOTPExpired = user.otpExpiresAt < new Date();
        if (isOTPExpired) {
            await userService.updateOTPStatus(user._id, { otp: null, otpExpiresAt: null });
            throw new BadRequest('OTP Expired')
        }

        // Verify OTP
        if (user.otp !== otp) {
            throw new BadRequest('Invalid OTP')
        }

        // Update User  Status to Verified
        const updatedUser = await userService.updateOTPStatus(user._id, { otp: null, otpExpiresAt: null });
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

