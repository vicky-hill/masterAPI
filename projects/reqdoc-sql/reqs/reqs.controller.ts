import { Request, Response, NextFunction } from 'express'
import * as Req from './reqs.functions'

export const getReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requirement = await Req.getReqs();
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const getReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
       
        const requirement = await Req.getReq(reqId);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const createReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const requirement = await Req.createReq(req.body);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const updateReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;

        const requirement = await Req.updateReq(req.body, reqId);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const deleteReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        
        const requirement = await Req.deleteReq(reqId);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}
