import { Request, Response, NextFunction } from 'express'
import * as User from './users.functions'

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.createUser(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const user = await User.getUser(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}