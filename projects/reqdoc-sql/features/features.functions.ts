import throwError from '../../../utils/throwError'
import { getValue, setValue, updateValue } from '../../../utils/redis'
import { FeatureModel, ProjectModel } from '../models'
import { checkFeatureAccess, checkProjectAccess } from '../utils/access'
import { includeSubFeatures, includeMainFeature, includeReqs, orderSubFeatures, orderReqs, featureAttributes } from '../utils/include'
import { getFeatureByProjectKey, getFeaturesByProjectId, invalidateFeatureCache, invalidateProjectFeaturesCache, updateProjectFeaturesCache } from './features.utils'
import { CreateFeature, CreateSubFeature, SortFeature, UpdateFeature } from '../../../types/reqdoc/payload.types'
import validate from '../utils/validation'
import { Feature } from '../../../types/reqdoc/attribute.types'
import { cascadeDeleteFeature } from '../utils/delete'

export const getProjectFeatures = async (projectKey: string) => {
    const features = await getFeatureByProjectKey(projectKey);
    return features;
}

export const getFeature = async (featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    const cacheKey = `feature:${featureId}`;
    const cachedFeature = await getValue(cacheKey);
    if (cachedFeature) return cachedFeature;

    const feature = await FeatureModel.findByPk(featureId, {
        attributes: featureAttributes,
        include: [
            includeSubFeatures,
            includeMainFeature,
            includeReqs
        ],
        order: [
            orderSubFeatures,
            orderReqs
        ]
    })

    if (!feature) return throwError('Feature not found');

    await setValue(cacheKey, feature);

    return feature;
}

export const createFeature = async ({ name, projectId }: CreateFeature, userId: string) => {
    await checkProjectAccess(projectId, userId);

    await validate.createFeature({ name, projectId });

    const features: Feature[] = await getFeaturesByProjectId(projectId);

    const feature = await FeatureModel.create({
        projectId: Number(projectId),
        name: name,
        sort: features.length + 1
    });

    await updateValue(`features:project:${projectId}`, [...features, feature]);

    return [...features, feature];
}

export const updateFeature = async (data: UpdateFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const feature = await FeatureModel.findByPk(featureId);

    if (!feature) throw new Error('Feature not found');

    await feature.update(data);

    const features = await updateProjectFeaturesCache(feature.projectId.toString());
    await invalidateFeatureCache(feature.featureId.toString());

    return features;
}

export const deleteFeature = async (featureId: string, userId: string) => {
//     await checkFeatureAccess(featureId, userId);
// 
//     const deletedFeature = await cascadeDeleteFeature(featureId);
// 
//     const features: Feature[] = await updateProjectFeaturesCache(deletedFeature.projectId.toString());
//     await invalidateFeatureCache(featureId);
// 
//     return features;
}

export const createSubFeature = async (data: CreateSubFeature, featureId: string, userId: string) => {
    await checkFeatureAccess(featureId, userId);

    await validate.updateFeature(data);

    const mainFeature = await FeatureModel.findByPk(featureId, {
        include: [includeSubFeatures]
    })

    if (!mainFeature) return throwError('Feature not found');

    const projectId = mainFeature.projectId.toString();

    const subFeature = await FeatureModel.create({
        ...data,
        projectId: Number(projectId),
        parentId: Number(featureId),
        sort: mainFeature.subFeatures?.length || 0
    });

    const features: Feature[] = await getFeaturesByProjectId(projectId);

    await updateValue(`features:project:${projectId}`, features);
    await invalidateFeatureCache(featureId);

    return features;
}

export const sortFeatures = async (data: SortFeature[], userId: string) => {
    await validate.sort(data);

    const featureId = data[0].featureId;
    const feature = await FeatureModel.findByPk(featureId);

    if (!feature) throw new Error('Feature not found');
    
    await checkFeatureAccess(featureId, userId);``

    await Promise.all(data.map(({ featureId, sort }) => {
        FeatureModel.update(
            { sort },
            { where: { featureId } }
        )
    }));

    await invalidateProjectFeaturesCache(feature.projectId.toString());

    return 'sorted';
}