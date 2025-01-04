import Feature from './features.model'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'
import { CreateFeature, CreateSubFeature, SortFeatures, UpdateFeature } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'
import { reqs } from '../utils/populate'
import { checkFeatureAccess, checkProjectAccess } from '../utils/access'
import validate from '../utils/validation'
import { cascadeDeleteFeature } from '../utils/delete'


export const getFeatures = async (projectId: string) => {
    const features: FeatureAttributes[] = await Feature
        .find({ project: projectId, deleted: { $exists: false } })
        .sort({ sort: 1 })

    return { data: features }
}


export const getFeature = async (featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    const feature: FeatureAttributes | null = await Feature
        .findById(featureId)
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

    return feature;
}


export const createFeature = async (data: CreateFeature, projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    await validate.createFeature(data);

    const features: FeatureAttributes[] = await Feature.find({ project: projectId });

    if (!features) throwError(`Features with the project _id ${projectId} not be found`);

    const feature = await Feature.create({
        ...data,
        sort: features.length + 1
    });

    return feature;
}


export const updateFeature = async (data: UpdateFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const updatedFeature: FeatureAttributes | null = await Feature.findByIdAndUpdate(featureId, data, { new: true });

    if (!updatedFeature) return throwError(`Feature to update not found`);

    const feature = await Feature.findById(updatedFeature._id);

    return feature;
}


export const deleteFeature = async (featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    const deletedFeature = await cascadeDeleteFeature(featureId);

    return deletedFeature;
}


export const createSubFeature = async (data: CreateSubFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const feature: FeatureAttributes | null = await Feature.findById(featureId).populate('sub_features');

    if (!feature) return throwError('Feature not found');

    const subFeature: FeatureAttributes = await Feature.create({
        ...data,
        project: feature.project,
        sort: feature.sub_features.length,
        main_feature: featureId
    });

    return subFeature;
}


export const sortFeatures = async (data: any, userId: string) => {
    data as SortFeatures;

    await validate.sort(data);
    await checkFeatureAccess(data[0]._id, userId);

    const result = [];

    for (const feature of data) {
        const { _id, sort } = feature;
        const updatedFeature = await Feature.findByIdAndUpdate(_id, { sort }, { new: true });
        result.push(updatedFeature);
    }

    return { data }
}