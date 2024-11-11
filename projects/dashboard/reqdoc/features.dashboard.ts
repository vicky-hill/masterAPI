import Feature from '../../reqdoc/features/features.model'
import { Request, Response, NextFunction } from 'express'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'  
import { CreateFeature, UpdateFeature } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'

export const getFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const features: FeatureAttributes[] = await Feature.find();
        res.json(features);
    } catch (err: any) {
        err.ctrl = getFeatures;
        next(err);
    }
}

export const getFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;

        const feature: FeatureAttributes | null = await Feature.findById(featureId);
        if (!feature) return throwError('Feature not found');
        
        res.json(feature);
    } catch (err: any) {
        err.ctrl = getFeature;
        next(err);
    }
}

export const createFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateFeature;

        const feature: FeatureAttributes | null = await Feature.create(req.body);
        
        res.json(feature);    
    } catch (err: any) {
        err.ctrl = createFeature;
        next(err);
    }
}

export const updateFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateFeature;

        const { featureId } = req.params;

        const updatedFeature: FeatureAttributes | null = await Feature.findByIdAndUpdate(
            featureId, req.body, { new: true }
        );
    
        res.json(updatedFeature);    
    } catch (err: any) {
        err.ctrl = updateFeature;
        next(err);
    }
}

export const deleteFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureId } = req.params;

        const feature = await Feature.findByIdAndDelete(featureId);
        
        res.json(feature);    
    } catch (err: any) {
        err.ctrl = deleteFeature;
        next(err);
    }
}