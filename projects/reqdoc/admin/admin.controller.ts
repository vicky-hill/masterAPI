import Feature from '../features/features.model'
import Project from '../projects/projects.model'
import Req from '../reqs/reqs.model'
import {Request, Response, NextFunction} from 'express'
import throwError from '../../../utils/throwError'


export const deleteFlagged = async (req: any, res: Response, next: NextFunction) => {
    try {
        if (req.user.email !== 'pm@excersys.com') throwError('Not authorized, dev route only');

        await Project.deleteMany({ deleted: true });
        await Req.deleteMany({ deleted: true });
        await Feature.deleteMany({ deleted: true });
        
        res.json({ msg: 'All flagged resources deleted'});
    
    } catch (err: any) {
        err.ctrl = deleteFlagged;
        next(err);
    }
}