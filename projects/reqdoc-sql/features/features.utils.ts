import { featureAttributes, includeSubFeatures } from '../utils/include'
import { deleteValue, getValue, setValue } from '../../../utils/redis'
import { Feature } from '../../../types/reqdoc/attribute.types'
import { ProjectModel, FeatureModel } from '../models'

export const invalidateProjectFeaturesCache = async (projectId: string) => {
    // const cacheKey = `features:project:${projectId}`
    // await deleteValue(cacheKey)
}

export const invalidateFeatureCache = async (featureId: string) => {
    // const cacheKey = `feature:${featureId}`
    // await deleteValue(cacheKey)
}

export const updateProjectFeaturesCache = async (projectId: string) => {
    await invalidateProjectFeaturesCache(projectId);
    // const features: Feature[] = await getFeaturesByProjectId(projectId);
    // return features;
}

export const getFeatureByProjectKey = async (projectKey: string) => {
    const project = await ProjectModel.findOne({
        where: { projectKey }
    })

    if (!project) throw new Error('Project not found');

    // const features: Feature[] = await getFeaturesByProjectId(project.getDataValue('projectId').toString());
    // return features;
}

export const getFeaturesByProjectId = async (projectId: string) => {
//     const cacheKey = `features:project:${projectId}`
// 
//     const cachedFeatures = await getValue(cacheKey)
//     if (cachedFeatures) return JSON.parse(cachedFeatures);

    const features = await FeatureModel.findAll({
        where: { projectId},
        attributes: featureAttributes,
        include: [
            includeSubFeatures
        ]
    });

    // await setValue(cacheKey, JSON.stringify(features));

    return features;
}