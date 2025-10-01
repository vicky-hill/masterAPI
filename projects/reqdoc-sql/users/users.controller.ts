import { NextFunction, Request, Response } from 'express'
import * as User from './users.functions'

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params;
       
        const user = await User.getUser(userId);
        res.json(user);
    } catch (err) {
        next(err);
    }
}