import { Request, Response, NextFunction } from 'express'
import * as Feature from './features.functions'

export const getProjectFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectKey } = req.params;
        const { userId } = req.user;

        const features = await Feature.getProjectFeatures(projectKey, userId);
        res.json(features);
    } catch (err) {
        next(err);
    }
}

export const getFeatureById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;

        const feature = await Feature.getFeatureById(featureId, userId)
        res.json(feature);
    } catch (err: any) {
        next(err);
    }
}

export const createFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;

        const feature = await Feature.createFeature(req.body, userId);
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
