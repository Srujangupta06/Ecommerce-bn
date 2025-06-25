import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'
import { Unauthorized } from '../errors/Errors'

declare global {
    namespace Express {
        interface Request{
            user?:any
        }
    }
}

export const verifyJwtToken = (req:Request,res:Response,next:NextFunction): void => {
    try {
        const secretKey : any = process.env.JWT_SECRET
        const authToken = req.headers['authorization']?.split(' ')[1]
        if(!authToken){
            throw new Unauthorized('Token not found')
        } 
        const decoded = jwt.verify(authToken,secretKey)
        req.user = decoded
        next()
    } catch (error) {
        res.status(500).json({
            message:'Invalid Token'
        })
    }

}