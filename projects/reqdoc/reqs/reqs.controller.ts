import { Request, Response, NextFunction } from 'express'
import * as Req from './reqs.functions'


export const getFeatureReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const data = await Req.getFeatureReqs(featureId, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const getProjectReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;

        const data = await Req.getProjectReqs(projectId, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const getReqById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Req.getReqById(reqId, userId);
        res.json(requirement);
    } catch (err: any) {
        next(err);
    }
}

export const getReqByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { reqKey, projectKey } = req.params;

        const requirement = await Req.getReqByKey(reqKey, projectKey, userId);
        res.json(requirement);
    } catch (err: any) {
        next(err);
    }
}

export const createReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const featureId = req.body.feature;
        const { userId } = req.user;

        const requirement = await Req.createReq(req.body, featureId, userId);
        res.json(requirement);
    } catch (err: any) {
        next(err);
    }
}

export const updateReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const requirement = await Req.updateReq(req.body, reqId, userId);
        res.json(requirement);
    } catch (err: any) {
        next(err);
    }
}

export const deleteReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const deletedReq = await Req.deleteReq(reqId, userId);

        res.json(deletedReq);
    } catch (err: any) {
        next(err);
    }
}

export const changeReq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;

        const latestReq = await Req.changeReq(req.body, reqId, userId);
        res.json(latestReq);
    } catch (err: any) {
        next(err);
    }
}

export const sortReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const data = await Req.sortReqs(req.body, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const searchReqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { term } = req.query;
        const { projectId } = req.params;

        const data = await Req.searchReqs(projectId, term);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}

export const addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { reqId } = req.params;

        const updatedReq = await Req.addComment(req.body, reqId, userId);
        res.json(updatedReq)
    } catch (err: any) {
        next(err);
    }
}

export const editComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const { commentID } = req.params;

        const updatedReq = await Req.editComment(req.body, commentID, userId);
        res.json(updatedReq);
    } catch (err: any) {
        next(err);
    }
}

export const deleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { commentID } = req.params;
        const { userId } = req.user;

        const updatedReq = await Req.deleteComment(commentID, userId);
        res.json(updatedReq);
    } catch (err: any) {
        next(err);
    }
}
