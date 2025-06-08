import jwt from 'jsonwebtoken'
import {  InternalServerError } from '../errors/Errors';
export const generateToken = (payload: { id: string, role: string, email: string }): string => {
    const secretKey = process.env.JWT_SECRET
    if (!secretKey) {
        throw new InternalServerError("JWT_SECRET_KEY is not defined!!");
    }
    return jwt.sign(payload, secretKey, { expiresIn: '1d' })
}

