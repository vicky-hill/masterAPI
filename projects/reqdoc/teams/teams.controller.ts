import Team from './teams.model'
import User from '../users/users.model'
import { Request, Response, NextFunction } from 'express';
import validate from '../utils/validation';
import { TeamAttributes } from '../../../types/reqdoc/attributes.types';
import { CreateTeam, UpdateTeam } from '../../../types/reqdoc/payloads.types';
import throwError from '../../../utils/throwError';
import { UserAttribute } from 'aws-sdk/clients/workmail';

export const createTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateTeam;

        await validate.createTeam(req.body);

        const team: TeamAttributes = await Team.create({ name: req.body.name })
        const updatedTeam: TeamAttributes | null = await Team.findByIdAndUpdate(
            team._id,
            {
                $push: {
                    users: {
                        user: req.body.user,
                        role: 'user'
                    }
                }
            },
            { new: true }
        )

        res.json(updatedTeam);
    } catch (err: any) {
        err.ctrl = createTeam;
        next(err);
    }
}

export const getTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams: TeamAttributes[] = await Team.find();
        res.json(teams);
    } catch (err: any) {
        err.ctrl = getTeams;
        next(err);
    }
}

export const updateTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateTeam;

        const { teamID } = req.params;

        const team: TeamAttributes | null = await Team.findByIdAndUpdate(teamID, req.body, { new: true })
            .populate({
                path: 'users.user',
                select: 'email',
            })

        if (!team) return throwError('Team not found');

        res.json(team);
    } catch (err: any) {
        err.ctrl = updateTeam;
        next(err);
    }
}

export const getUserTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamID } = req.params;

        const team: TeamAttributes | null = await Team.findByIdAndUpdate(teamID, req.body, { new: true })
            .populate({
                path: 'users.user',
                select: 'email',
            })

        if (!team) return throwError('Team not found');

        res.json(team);
    } catch (err: any) {
        err.ctrl = getUserTeam;
        next(err);
    }
}


export const getUserTeams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userID } = req.user;

        const teams: TeamAttributes[] = await Team.find({ 'users.user': userID }).populate({
            path: 'users.user',
            select: 'email',
        })

        res.json({ data: teams })
    } catch (err: any) {
        err.ctrl = getUserTeams;
        next(err);
    }
}

export const switchUserTeam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { teamID } = req.params;
        const { userID } = req.user;

        const team: TeamAttributes | null = await Team.findById(teamID).populate({
            path: 'users.user',
            select: 'email',
        })

        if (!team) return throwError('Team not found');

        const teamUser = team.users.find(user =>
            user.user._id.toString() === userID.toString()
        )

        if (!teamUser) return throwError('Team user not found');

        const user: UserAttribute | null = await User.findByIdAndUpdate(userID,
            { role: teamUser.role, team: team._id },
            { new: true }
        );

        res.json(user)
    } catch (err: any) {
        err.ctrl = switchUserTeam;
        next(err);
    }
}