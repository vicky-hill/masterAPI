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

export const addUserToCurrentTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const { userId } = req.params;
    const { teamId } = req.user;

    const result = await Team.addUserToCurrentTeam(teamId as string, userId as string);
    res.json(result)
  } catch (err) {
    next(err)
  }
}

export const removeUserFromCurrentTeam = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const { userId } = req.params;
    const { teamId } = req.user;

    const result = await Team.removeUserFromCurrentTeam(teamId as string, userId as string);
    res.json(result)
  } catch (err) {
    next(err)
  }
}