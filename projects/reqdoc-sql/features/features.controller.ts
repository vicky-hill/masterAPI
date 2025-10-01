import { Request, Response, NextFunction } from 'express'
import * as Feature from './features.functions'

export const getFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectId } = req.params;

        const features = await Feature.getFeatures(projectId);
        res.json(features);
    } catch (err) {
        next(err);
    }
}
