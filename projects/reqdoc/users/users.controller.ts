import User from './users.model'
import Team from '../teams/teams.model'
import jwt_decode from 'jwt-decode'

import { Request, Response, NextFunction } from 'express'
import { TeamAttributes, UserAttributes } from '../../../types/reqdoc/attributes.types'
import validate from '../utils/validation'
import { InviteUser, UpdateUser } from '../../../types/reqdoc/payloads.types'


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: UserAttributes[] = await User.find()
            .select('-firebaseID -createdAt -updatedAt -__v')
        res.json(users);
    } catch (err: any) {
        err.ctrl = getUsers;
        next(err);
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.body.email?.split('@')[0];
        const body = { ...req.body, name }

        await validate.createUser(body);

        const newUser: UserAttributes = await User.create(body);
        const newTeam: TeamAttributes = await Team.create({
            name: 'New Team',
            users: [{ user: newUser._id, role: 'admin' }]
        })

        await User.findByIdAndUpdate(
            newUser._id,
            { team: newTeam._id, role: 'admin' },
            { new: true }
        )

        const user: UserAttributes | null = await User.findById(newUser._id)
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(201).json(user);
    } catch (err: any) {
        err.ctrl = createUser;
        next(err);
    }
}

export const inviteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as InviteUser;

        const { userID } = req.user;
        const { team } = req.body;

        if (userID) {
            await Team.findByIdAndUpdate(
                team,
                { $push: { users: { user: userID, role: 'user' } } },
                { new: true }
            )

            const user: UserAttributes | null = await User.findById(userID)
                .select('-firebaseID -createdAt -updatedAt -__v');

            return res.json(user);
        } 
    } catch (err: any) {
        err.ctrl = inviteUser;
        next(err);
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateUser;

        const { userID } = req.user;

        await validate.updateUser(req.body);

        const updatedUser: UserAttributes | null = await User.findByIdAndUpdate(userID, req.body, { new: true })
            .select('-firebaseID -createdAt -updatedAt -__v');

        res.status(200).json(updatedUser);
    } catch (err: any) {
        err.ctrl = updateUser;
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            res.json(null);
            return;
        }

        const decodedToken: any = jwt_decode(token);

        const user: UserAttributes | null = await User.findOne({ firebaseID: decodedToken.user_id })
            .select('-firebaseID -createdAt -updatedAt -__v');

        if (!user) {
            res.json(null);
            return;
        }

        res.json(user);
    } catch (err: any) {
        err.ctrl = getUser;
        next(err);
    }
}