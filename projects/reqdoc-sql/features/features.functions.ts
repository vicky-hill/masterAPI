import FeatureModel from './features.model'

export const getFeatures = async (projectId: string) => {
    const featureInstances = await FeatureModel.findAll({
        where: { projectId, parentId: null },
        include: [{
            model: FeatureModel,
            as: 'subFeatures'
        }]
    });

    const features = featureInstances.map((featureInstance) => {
        const feature = featureInstance.get({ plain: true });
        return { ...feature };
    })

    return features;
}