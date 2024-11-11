import Req from '../../reqdoc/reqs/reqs.model'
import { Request, Response, NextFunction } from 'express'
import { ReqAttributes } from '../../../types/reqdoc/attributes.types'  
import { CreateReq, UpdateReq } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'

export const getReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reqs: ReqAttributes[] = await Req.find();
        res.json(reqs);
    } catch (err: any) {
        err.ctrl = getReqs;
        next(err);
    }
}

export const getReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;

        const requirement: ReqAttributes | null = await Req.findById(reqId);
        if (!requirement) return throwError('Req not found');
        
        res.json(requirement);
    } catch (err: any) {
        err.ctrl = getReq;
        next(err);
    }
}

export const createReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateReq;

        const requirement: ReqAttributes | null = await Req.create(req.body);
        
        res.json(requirement);    
    } catch (err: any) {
        err.ctrl = createReq;
        next(err);
    }
}

export const updateReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateReq;

        const { reqId } = req.params;

        const updatedReq: ReqAttributes | null = await Req.findByIdAndUpdate(
            reqId, req.body, { new: true }
        );
    
        res.json(updatedReq);    
    } catch (err: any) {
        err.ctrl = updateReq;
        next(err);
    }
}

export const deleteReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;

        const requirement = await Req.findByIdAndDelete(reqId);
        
        res.json(requirement);    
    } catch (err: any) {
        err.ctrl = deleteReq;
        next(err);
    }
}