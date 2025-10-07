import { Request } from 'express'
import { ObjectId } from 'mongoose'

declare global {
    namespace Express {
        interface Request {
            user: {
                userId: string
                teamId: number
                email: string
                role: 'admin' | 'user'
                teams: Team[]
                team: Team
                deleted?: string | null
            }
        }
    }
}