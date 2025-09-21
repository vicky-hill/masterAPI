import { Request, Response, NextFunction } from 'express'
import * as Feature from './features.functions'

export const getFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectKey } = req.params;

        const features = await Feature.getFeatures(projectKey);
        res.json(features);
    } catch (err: any) {
        next(err);
    }
}

export const getFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const feature = await Feature.getFeature(featureId, userId)
        res.json(feature);
    } catch (err: any) {
        next(err);
    }
}

export const createFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectId = req.body.project;
        const userId = req.user._id;

        const feature = await Feature.createFeature(req.body, projectId, userId);
        res.json(feature);
    } catch (err: any) {
        next(err);
    }
}

export const updateFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const feature = await Feature.updateFeature(req.body, featureId, userId);
        res.json(feature);
    } catch (err: any) {
        next(err);
    }
}

export const deleteFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const deletedFeature = await Feature.deleteFeature(featureId, userId);
        res.json(deletedFeature);
    } catch (err: any) {
        next(err);
    }
}

export const createSubFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const subFeature = await Feature.createSubFeature(req.body, featureId, userId);
        res.json(subFeature);
    } catch (err: any) {
        next(err);
    }
}


export const sortFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const data = await Feature.sortFeatures(req.body, userId);
        res.json(data);
    } catch (err: any) {
        next(err);
    }
}