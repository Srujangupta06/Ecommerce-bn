import mongoose from "mongoose";
import validator from 'validator';

export interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
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
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', userSchema) || mongoose.models.User;
export default UserModel;