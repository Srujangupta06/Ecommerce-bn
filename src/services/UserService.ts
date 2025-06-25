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
        user.validToken = undefined
        user.resetPassExpired = undefined
        await user.save()
        console.log(user)
        return user
    }

    async filterToken(token:string,email:string){
        const user = await UserModel.findOne({email})
        user.validToken = token
        user.resetPassExpired = new Date(Date.now() + 3600)
        await user.save()
        return user
    }

    async resetUsrPassword(email:string,password:string){
        const user = await UserModel.findOne({email})
        if(user && user.resetPassExpired < new Date()){
            user.password = password
            user.resetPassExpired = undefined
            user.validToken = undefined
            await user.save()
            return user
        }
        return null
    }
}