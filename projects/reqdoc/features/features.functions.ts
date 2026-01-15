import { Feature, Project, Team, UserModel } from '../models'
import { includeSubFeatures, includeMainFeature, includeReqs, orderSubFeatures, orderReqs, featureAttributes } from '../utils/include'
import validate from '../utils/validation'
import { Op } from 'sequelize'

interface CreateFeature {
    name: string
    projectId: string
}

export const getProjectFeatures = async (projectKey: string, userId: string) => {
    const project = await Project.findOne({
        rejectOnEmpty: new Error('No project found'),
        where: { projectKey },
        include: [{
            model: Team,
            include: [{
                model: UserModel,
                where: { userId }
            }, {
                model: Feature,
                where: { parentId: { [Op.ne]: null } },
                required: false,
                include: [includeSubFeatures]
            }]
        }]
    })

    return project.features;
}

export const getFeatureById = async (featureId: string, userId: string) => {
    const cached = await Feature.getCache(featureId, userId);
    if (cached) return cached;

    const feature = await Feature.findByPk(featureId, {
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
    await Project.checkAccess(projectId, userId);

    const featureCount = await Feature.count({
        where: { projectId, parentId: null }
    });

    await Feature.create(
        {
            projectId: Number(projectId),
            name: name,
            sort: featureCount + 1
        },
        {
            fields: ['name', 'projectId']
        }
    );

    const features = await Feature.getFeaturesByProjectId(projectId);
    return features;
}

export const updateFeature = async (data: { name: string }, featureId: string, userId: string) => {
    await validate.updateFeature(data);

    const feature = await Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);
    await feature.update(data, { fields: ['name'] });
    await feature.clearCache();

    const features = await Feature.getFeaturesByProjectId(feature.projectId);
    return features;
}

export const deleteFeature = async (featureId: string, userId: string) => {
    const feature = await Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);
    await feature.destroy();

    const features = await Feature.getFeaturesByProjectId(feature.projectId);
    return features;
}

export const createSubFeature = async (data: { name: string }, featureId: string, userId: string) => {
    await validate.updateFeature(data);

    const mainFeature = await Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
        include: [includeSubFeatures]
    })

    await mainFeature.checkAccess(userId);

    const projectId = mainFeature.projectId;

    await Feature.create({
        ...data,
        projectId: Number(projectId),
        parentId: Number(featureId),
        sort: mainFeature.subFeatures?.length || 0
    });

    const features = await Feature.getFeaturesByProjectId(projectId);
    return features;
}

export const sortFeatures = async (data: { featureId: number, sort: number }[], userId: string) => {
    await validate.sort(data);

    const featureId = data[0].featureId;
    
    const feature = await Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });

    await feature.checkAccess(userId);

    await Promise.all(data.map(({ featureId, sort }) => {
        Feature.update(
            { sort },
            { where: { featureId } }
        )
    }));

    return 'sorted';
}