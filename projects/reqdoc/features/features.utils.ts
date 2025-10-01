import FeatureModel from './features.model'
import { deleteValue, flushAll, getValue, setValue } from '../../../utils/redis'
import { FeatureAttributes } from '../../../types/reqdoc/attributes.types'
import { ObjectId } from 'mongoose'

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
    const features: FeatureAttributes[] = await getFeaturesByProjectId(projectId);
    return features;
}

export const getFeaturesByProjectId = async (projectId: string | ObjectId) => {
    // const cacheKey = `features:project:${projectId}`

    // const cachedFeatures = await getValue(cacheKey)
    // if (cachedFeatures) return JSON.parse(cachedFeatures);

    const features: FeatureAttributes[] = await FeatureModel
        .find({ project: projectId, main_feature: { $exists: false }, deleted: { $exists: false } })
        .select('_id name')
        .populate({
            path: 'sub_features',
            match: { deleted: { $exists: false } },
            select: '_id name main_feature',
            options: { sort: { sort: 1 } }
        })
        .sort({ sort: 1 })

    // await setValue(cacheKey, JSON.stringify(features));

    return features;
}

