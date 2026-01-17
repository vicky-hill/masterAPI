import { Request } from 'express'
import { InferAttributes, NonAttribute } from 'sequelize'
import { Team } from '../projects/reqdoc/models'

declare global {
    namespace Express {
        interface Request {
            // user: {
            //     userId: string
            //     teamId: number
            //     email: string
            //     role: 'admin' | 'user'
            //     teams: InferAttributes<Team>[]
            //     team: InferAttributes<Team>
            // }
            user: any
            session?: { token?: string; nowInMinutes?: number } | null
        }
    }
}