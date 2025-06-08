import mongoose, { Document } from "mongoose";
import validator from "validator";

enum UserRole {
    user = "USER",
    seller = "SELLER",
    admin = "ADMIN"
}


export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    mobileNumber: string;
    avatarUrl?: string;
    otp?: string | null;
    otpExpiresAt?: Date | null;
    isVerified: boolean;
    role: UserRole
}



const userSchema = new mongoose.Schema<IUser>(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
        },
        lastName: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (value: string) => validator.isEmail(value),
                message: (props: any) => `${props.value} is not a valid email!`,
            },
        },
        mobileNumber: {
            type: String,
            required: true,
            maxLength: 10,
            validate: {
                validator: (value: string) => validator.isMobilePhone(value, 'any'),
                message: (props: any) => `${props.value} is not a valid phone number!`,
            },
        },
        password: {
            type: String,
            required: true,
            minLength: 8,
        },
        avatarUrl: {
            type: String,
            default: "",
        },
        otp: {
            type: String,
            default: null,
        },
        otpExpiresAt: {
            type: Date,
            default: null,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            default: UserRole.user
        }
    },
    { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default UserModel;
