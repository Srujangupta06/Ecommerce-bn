import { UnprocessableEntity } from '../../errors/Errors'

interface User {
    firstName: string,
    lastName?: string,
    email: string,
    password: string,
    mobileNumber: string
}

export const validateSignUpUser = (user: User) => {

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    const { firstName, lastName, email, password, mobileNumber } = user
    if (firstName.trim() === '' || typeof firstName !== 'string') {
        throw new UnprocessableEntity('First Name is required', { firstName })
    }

    if (firstName.trim().length < 3) {
        throw new UnprocessableEntity('First Name must be at least 3 characters long', { firstName })
    }

    if (lastName !== undefined) {
        if (lastName.trim() === '' || typeof lastName !== 'string') {
            throw new UnprocessableEntity('Last Name is required', { lastName })
        }
    }

    if (email.trim() === '' || typeof email !== 'string') {
        throw new UnprocessableEntity('Email is required', { email })
    }

    if (email.includes('@') === false) {
        throw new UnprocessableEntity('Invalid Email', { email })
    }

    if (password.trim() === '' || typeof password !== 'string') {
        throw new UnprocessableEntity('Password is required', { password })
    }

    if (password.trim().length < 8) {
        throw new UnprocessableEntity('Password must be at least 8 characters long', { password })
    }

    if (!passwordPattern.test(password)) {
        throw new UnprocessableEntity('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character', { password })
    }

    if (mobileNumber.trim() === '' || typeof mobileNumber !== 'string') {
        throw new UnprocessableEntity('Mobile Number is required', { mobileNumber })
    }

    if (mobileNumber.length !== 10) {
        throw new UnprocessableEntity('Mobile Number must be 10 digits', { mobileNumber })
    }
}


export const validateEmailAndOtp = (email: string, otp: string) => {
    if (email.trim() === '' || typeof email !== 'string') {
        throw new UnprocessableEntity('Email is required', { email })
    }
    if (email.includes('@') === false) {
        throw new UnprocessableEntity('Invalid Email', { email })
    }
    if (otp.trim() === '' || typeof otp !== 'string') {
        throw new UnprocessableEntity('OTP is required', { otp })
    }
    if (otp.trim().length !== 6) {
        throw new UnprocessableEntity('OTP must be 6 digits', { otp })
    }
}