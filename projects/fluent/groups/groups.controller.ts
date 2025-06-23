import { Request, Response, NextFunction } from 'express'
import * as Group from './groups.functions'

export const getGroups = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const language = req.query.language as string;

        const groups = await Group.getGroups(language);
        res.json(groups);
    } catch (err) {
        next(err);
    }
}

export const getGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;

        const group = await Group.getGroup(groupId);
        res.json(group);
    } catch (err) {
        next(err);
    }
}

export const createGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const group = await Group.createGroup(req.body);
        res.json(group);    
    } catch (err) {
        next(err);
    }
}

export const updateGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;

        const group = await Group.updateGroup(req.body, groupId);
        res.json(group);    
    } catch (err) {
        next(err);
    }
}

export const deleteGroup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { groupId } = req.params;

        const group = await Group.deleteGroup(groupId);
        res.json(group);    
    } catch (err) {
        next(err);
    }
}
