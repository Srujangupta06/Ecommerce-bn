import { UnprocessableEntity } from "../../errors/Errors"

export const validateResendOTP = (email: string) => {
    if (email.trim() === '' || typeof email !== 'string') {
        throw new UnprocessableEntity('Email is required', { email })
    }

    if (email.includes('@') === false) {
        throw new UnprocessableEntity('Invalid Email', { email })
    }
}