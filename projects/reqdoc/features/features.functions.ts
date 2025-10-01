import Feature from './features.model'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'
import { CreateFeature, CreateSubFeature, SortFeatures, UpdateFeature } from '../../../types/reqdoc/payloads.types'
import throwError from '../../../utils/throwError'
import {reqs, subFeatures, mainFeature} from '../utils/populate';
import { checkFeatureAccess, checkProjectAccess } from '../utils/access'
import validate from '../utils/validation'
import { cascadeDeleteFeature } from '../utils/delete'
import {updateValue, getValue, setValue} from '../../../utils/redis'
import {getFeaturesByProjectId, invalidateProjectFeaturesCache, updateProjectFeaturesCache, invalidateFeatureCache} from './features.utils'
import ProjectModel from '../projects/projects.model'


export const getFeatures = async (projectKey: string) => {
    const project = await ProjectModel.findOne({ slug: projectKey });

    if (!project) throw new Error('Project not found');

    const features = await getFeaturesByProjectId(project._id);

    return features;
}

export const getFeature = async (featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    // const cacheKey = `feature:${featureId}`;
    // const cachedFeature = await getValue(cacheKey);
    // if (cachedFeature) return cachedFeature;

    const feature: FeatureAttributes | null = await Feature
        .findById(featureId)
        .populate([
            reqs,
            subFeatures,
            mainFeature
        ]);

    if (!feature) return throwError('Feature not found');

    //  await setValue(cacheKey, feature);

    return feature;
}


export const createFeature = async (data: CreateFeature, projectId: string, userId: string) => {
    await checkProjectAccess(projectId, userId);

    await validate.createFeature(data);

    const features: FeatureAttributes[] = await getFeaturesByProjectId(projectId);

    const feature = await Feature.create({
        ...data,
        sort: features.length + 1,
        sub_features: []
    });

    // await updateValue(`features:project:${projectId}`, [...features, feature]);

    return [...features, feature];
}


export const updateFeature = async (data: UpdateFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const updatedFeature = await Feature.findByIdAndUpdate(featureId, data, { new: true });

    if (!updatedFeature) return throwError(`Feature to update not found`);

    const features = await updateProjectFeaturesCache(updatedFeature.project.toString());
    await invalidateFeatureCache(featureId);

    return features;
}


export const deleteFeature = async (featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    const deletedFeature = await cascadeDeleteFeature(featureId);
  
    const features: FeatureAttributes[] = await updateProjectFeaturesCache(deletedFeature.project.toString());
    await invalidateFeatureCache(featureId);
    
    return features;
}


export const createSubFeature = async (data: CreateSubFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const mainFeature = await Feature.findById(featureId).populate('sub_features');

    if (!mainFeature) return throwError('Feature not found');

    const projectId = mainFeature.project.toString();

    const subFeature: FeatureAttributes = await Feature.create({
        ...data,
        project: projectId,
        sort: mainFeature.sub_features.length,
        main_feature: featureId
    });

    const features: FeatureAttributes[] = await getFeaturesByProjectId(projectId);

    const updatedFeatures = features.map(feature => (
        feature._id === mainFeature._id.toString()
            ? { ...feature, sub_features: [...feature.sub_features, subFeature.toObject()] }
            : feature
    ));

    // await updateValue(`features:project:${projectId}`, updatedFeatures);
    await invalidateFeatureCache(featureId);

    return updatedFeatures;
}


export const sortFeatures = async (data: any, userId: string) => {
    data as SortFeatures;

    await validate.sort(data);
    await checkFeatureAccess(data[0]._id, userId);

    const result: any = [];

    for (const feature of data) {
        const { _id, sort } = feature;
        const updatedFeature = await Feature.findByIdAndUpdate(_id, { sort }, { new: true });
        result.push(updatedFeature);
    }

    await invalidateProjectFeaturesCache(result[0].project.toString());

    return { data }
}