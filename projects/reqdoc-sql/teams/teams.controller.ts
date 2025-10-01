import { Request, Response, NextFunction } from 'express'
import * as Team from './teams.functions'

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await Team.getTeams();
        res.json(teams);
    } catch (err) {
        next(err);
    }
}
