import { Request } from 'express'
import { InferAttributes, NonAttribute } from 'sequelize'
import { TeamModel } from '../projects/reqdoc-sql/models'

declare global {
    namespace Express {
        interface Request {
            // user: {
            //     userId: string
            //     teamId: number
            //     email: string
            //     role: 'admin' | 'user'
            //     teams: InferAttributes<TeamModel>[]
            //     team: InferAttributes<TeamModel>
            // }
            user: any
        }
    }
}