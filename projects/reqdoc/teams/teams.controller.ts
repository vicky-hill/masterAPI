import { Request, Response, NextFunction } from 'express'
import * as Team from './teams.functions'

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = await Team.createTeam(req.body) 
        res.json(team);
    } catch (err: any) {
        next(err);
    }
}

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await Team.getTeams();
        res.json(teams);
    } catch (err: any) {
        next(err);
    }
}

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;

        const team = await Team.updateTeam(req.body, teamId);
        res.json(team);
    } catch (err: any) {
        next(err);
    }
}

export const getUserTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;

        const team = await Team.getUserTeam(teamId);
        res.json(team);
    } catch (err: any) {
        next(err);
    }
}


export const getUserTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const teams = await Team.getUserTeams(userId);
        res.json(teams);
    } catch (err: any) {
        next(err);
    }
}

export const switchUserTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;
        const { userId } = req.user;

        const user = await Team.switchUserTeam(teamId, userId);
        res.json(user)
    } catch (err: any) {
        next(err);
    }
}