import { FeatureModel, ProjectModel, TeamModel, UserModel } from '../models'
import { includeSubFeatures, includeMainFeature, includeReqs, orderSubFeatures, orderReqs, featureAttributes } from '../utils/include'
import validate from '../utils/validation'
import { Op } from 'sequelize'

interface CreateFeature {
    name: string
    projectId: string
}

export const getProjectFeatures = async (projectKey: string, userId: string) => {
    const project = await ProjectModel.findOne({
        rejectOnEmpty: new Error('No project found'),
        where: { projectKey },
        include: [{
            model: TeamModel,
            include: [{
                model: UserModel,
                where: { userId }
            }, {
                model: FeatureModel,
                where: { parentId: { [Op.ne]: null } },
                required: false,
                include: [includeSubFeatures]
            }]
        }]
    })

    return project.features;
}

export const getFeatureById = async (featureId: string, userId: string) => {
    const cached = await FeatureModel.getCache(featureId, userId);
    if (cached) return cached;

    const feature = await FeatureModel.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
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

    await feature.setCache(feature);

    return feature;
}

export const createFeature = async ({ name, projectId }: CreateFeature, userId: string) => {
    await validate.createFeature({ name, projectId });
    await ProjectModel.checkAccess(projectId, userId);

    const featureCount = await FeatureModel.count({
        where: { projectId, parentId: null }
    });

    await FeatureModel.create(
        {
            projectId: Number(projectId),
            name: name,
            sort: featureCount + 1
        },
        {
            fields: ['name', 'projectId']
        }
    );

    const features = await FeatureModel.getFeaturesByProjectId(projectId);
    return features;
}

export const updateFeature = async (data: { name: string }, featureId: string, userId: string) => {
    await validate.updateFeature(data);

    const feature = await FeatureModel.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);
    await feature.update(data, { fields: ['name'] });
    await feature.clearCache();

    const features = await FeatureModel.getFeaturesByProjectId(feature.projectId);
    return features;
}

export const deleteFeature = async (featureId: string, userId: string) => {
    const feature = await FeatureModel.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);
    await feature.destroy();

    const features = await FeatureModel.getFeaturesByProjectId(feature.projectId);
    return features;
}

export const createSubFeature = async (data: { name: string }, featureId: string, userId: string) => {
    await validate.updateFeature(data);

    const mainFeature = await FeatureModel.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
        include: [includeSubFeatures]
    })

    await mainFeature.checkAccess(userId);

    const projectId = mainFeature.projectId;

    await FeatureModel.create({
        ...data,
        projectId: Number(projectId),
        parentId: Number(featureId),
        sort: mainFeature.subFeatures?.length || 0
    });

    const features = await FeatureModel.getFeaturesByProjectId(projectId);
    return features;
}

export const sortFeatures = async (data: { featureId: number, sort: number }[], userId: string) => {
    await validate.sort(data);

    const featureId = data[0].featureId;
    
    const feature = await FeatureModel.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);

    await Promise.all(data.map(({ featureId, sort }) => {
        FeatureModel.update(
            { sort },
            { where: { featureId } }
        )
    }));

    return 'sorted';
}