import UserModel from "../models/user.model";

export class UserService {
    async getUserByEmail(email: string) {
        const user = await UserModel.findOne({ email });
        return user
    }
    async getUserValidEmail(email:string) {
        const user = await UserModel.findOne({
            $and:[{email,isVerified:true}]
        })
        return user
    }
    async updateOTPStatus(id: string, data: { otp: string | null, otpExpiresAt: Date | null,isVerified:boolean }) {
        const user = await UserModel.findOneAndUpdate({ _id: id }, { ...data});
        return user
    }
}