import Feature from './features.model'
import { Request, Response, NextFunction } from 'express'
import throwError from '../../../utils/throwError'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'
import { checkFeatureAccess, checkProjectAccess } from '../utils/access'
import { reqs } from '../utils/populate'
import validate from '../utils/validation'
import { cascadeDeleteFeature } from '../utils/delete'
import { CreateFeature, CreateSubFeature, SortFeatures, UpdateFeature } from '../../../types/reqdoc/payloads.types'

export const getFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { projectID } = req.params;

        const features: FeatureAttributes[] = await Feature
            .find({ project: projectID,  deleted: { $exists: false } })
            .sort({ sort: 1 })

        res.json({ data: features });
    } catch (err: any) {
        err.ctrl = getFeatures;
        next(err);
    }
}

export const getFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const feature: FeatureAttributes | null = await Feature
            .findById(featureID)
            .populate([
                reqs,
                {
                    path: 'sub_features',
                    options: { sort: { sort: 'asc' } },
                    populate: reqs,
                },
                {
                    path: 'main_feature',
                    select: 'name'
                }
            ]);

        if (!feature) return throwError('Feature not found');

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

        feature.reqs = JSON.parse(JSON.stringify([...feature.reqs.sort((a, b) => a.sort - b.sort), ...subFeatureReqs]))
        feature.sub_features = feature.sub_features.map(sub_feature => JSON.parse(JSON.stringify({ ...sub_feature, reqs: null })))

        res.json(feature);
    } catch (err: any) {
        err.ctrl = getFeature;
        next(err);
    }
}

export const createFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateFeature;

        const projectID = req.body.project;
        const userID = req.user._id;

        await checkProjectAccess(projectID, userID);

        await validate.createFeature(req.body);

        const features: FeatureAttributes[] = await Feature.find({ project: req.body.project });

        if (!features) throwError(`Features with the project _id ${projectID} not be found`);

        const feature = await Feature.create({
            ...req.body,
            sort: features.length + 1
        });

        res.json(feature);
    } catch (err: any) {
        err.ctrl = createFeature;
        next(err);
    }
}

export const updateFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateFeature;

        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        await validate.updateFeature(req.body);

        const updatedFeature: FeatureAttributes | null = await Feature.findByIdAndUpdate(featureID, req.body, { new: true });

        if (!updatedFeature) return throwError(`Feature to update not found`);

        const feature = await Feature.findById(updatedFeature._id);

        res.status(200).json(feature);
    } catch (err: any) {
        err.ctrl = updateFeature;
        next(err);
    }
}

export const deleteFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const deletedFeature = await cascadeDeleteFeature(featureID);

        res.json(deletedFeature);
    } catch (err: any) {
        err.ctrl = deleteFeature;
        next(err);
    }
}

export const createSubFeature = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateSubFeature;

        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        await validate.updateFeature(req.body);

        const feature: FeatureAttributes | null = await Feature.findById(featureID).populate('sub_features');

        if (!feature) return throwError('Feature not found');

        const subFeature: FeatureAttributes = await Feature.create({
            ...req.body,
            project: feature.project,
            sort: feature.sub_features.length,
            main_feature: featureID
        });

        res.json(subFeature);
    } catch (err: any) {
        err.ctrl = createSubFeature;
        next(err);
    }
}


export const sortFeatures = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as SortFeatures;

        await validate.sort(req.body);
        const { userID } = req.user;

        await checkFeatureAccess(req.body[0]._id, userID);

        const data = [];

        for (const feature of req.body) {
            const { _id, sort } = feature;
            const updatedFeature = await Feature.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedFeature);
        }

        res.json({ data });
    } catch (err: any) {
        err.ctrl = sortFeatures;
        next(err);
    }
}