import UserModel from "../models/user.model";
import { generateOTP } from "../utils/GenerateOTP";

export class AuthService {
    async signUpUser(user: any) {
        const newUser = new UserModel({
            ...user,
            isVerified: false
        })
        const savedUser = await newUser.save();
        return savedUser
    }
}