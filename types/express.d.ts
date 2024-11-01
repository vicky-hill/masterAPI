import { Request } from 'express'
import { ObjectId } from 'mongoose'

declare global {
    namespace Express {
        interface Request {
            user: {
                _id: string
                userID: string
                email: string
                firebaseID: string
                name?: string
                team: ObjectId
                role: 'admin' | 'user'
                type: 'admin' | 'user'
                deleted?: date
            }
        }
    }
}