import Team from '../../reqdoc/teams/teams.model'
import { Request, Response, NextFunction } from 'express'
import { TeamAttributes } from '../../../types/reqdoc/attributes.types'  
import { CreateTeam, UpdateTeam } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams: TeamAttributes[] = await Team.find();
        res.json(teams);
    } catch (err: any) {
        err.ctrl = getTeams;
        next(err);
    }
}

export const getTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;

        const team: TeamAttributes | null = await Team.findById(teamId);
        if (!team) return throwError('Team not found');
        
        res.json(team);
    } catch (err: any) {
        err.ctrl = getTeam;
        next(err);
    }
}

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateTeam;

        const team: TeamAttributes | null = await Team.create(req.body);
        
        res.json(team);    
    } catch (err: any) {
        err.ctrl = createTeam;
        next(err);
    }
}

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateTeam;

        const { teamId } = req.params;

        const updatedTeam: TeamAttributes | null = await Team.findByIdAndUpdate(
            teamId, req.body, { new: true }
        );
    
        res.json(updatedTeam);    
    } catch (err: any) {
        err.ctrl = updateTeam;
        next(err);
    }
}

export const deleteTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamId } = req.params;

        const team = await Team.findByIdAndDelete(teamId);
        
        res.json(team);    
    } catch (err: any) {
        err.ctrl = deleteTeam;
        next(err);
    }
}