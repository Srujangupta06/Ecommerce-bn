import mongoose from "mongoose";
import validator from 'validator';

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    mobileNumber?: string;
    avatarUrl?: string;
    otp?: string;
    isVerified?: boolean
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3
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
            validator: (value: string) => validator.isMobilePhone(value),
            message: (props: any) => `${props.value} is not a valid phone number!`,
        },

    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    avatarUrl: {
        type: String,
        default: ""
    },
    otp: {
        type: String,
        default: ""
    },
    isVerified: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', userSchema) || mongoose.models.User;
export default UserModel;