import { Request, Response, NextFunction } from 'express'
import * as Admin from './admin.functions'

export const deleteFlagged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.user;

        await Admin.deleteFlagged(email)
        res.json({ msg: 'All flagged resources deleted' });
    } catch (err: any) {
        next(err);
    }
}