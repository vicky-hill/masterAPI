import { Request, Response, NextFunction } from 'express'
import * as Req from './reqs.functions'

export const getReqsByFeatureId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const reqs = await Req.getReqsByFeatureId(featureId, userId);
        res.json(reqs);
    } catch (err) {
        next(err);
    }
}

export const getReqById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Req.getReqById(reqId as string, userId);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const getReqByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectKey, reqKey } = req.params;
        const { userId } = req.user;

        const requirement = await Req.getReqByKey(projectKey, reqKey, userId);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const createReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const requirement = await Req.createReq(req.body, userId as string);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const updateReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Req.updateReq(req.body, reqId as string, userId as string);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const deleteReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Req.deleteReq(reqId as string, userId as string);
        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

export const changeReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const result = await Req.changeReq(req.body, reqId as string, userId as string);
        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const sortReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Req.sortReqs(req.body);
        res.json(result)
    } catch (err) {
        next(err)
    }
}

export const searchReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { term } = req.query;
        const { projectId } = req.params;
        const { userId } = req.user;

        const result = await Req.searchReqs(projectId as string, term as string, userId as string);
        res.json(result)
    } catch (err) {
        next(err)
    }
}