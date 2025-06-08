import UserModel from "../models/user.model";

export class UserService {
    async getUserByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        return user
    }
    async updateOTPStatus(id: string, data: { otp: string | null, otpExpiresAt: Date | null }) {
        const user = await UserModel.findOneAndUpdate({ _id: id }, { ...data, isVerified: true });
        return user
    }
}