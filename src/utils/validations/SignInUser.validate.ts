import { UnprocessableEntity } from '../../errors/Errors'

interface User {
    email: string,
    password: string,
}

export const validateSignInUser = (user: User) => {

    const { email, password } = user

    if (email.trim() === '' || typeof email !== 'string') {
        throw new UnprocessableEntity('Email is required', { email })
    }

    if (email.includes('@') === false) {
        throw new UnprocessableEntity('Invalid Email', { email })
    }

    if (password.trim() === '' || typeof password !== 'string') {
        throw new UnprocessableEntity('Password is required', { password })
    }

}