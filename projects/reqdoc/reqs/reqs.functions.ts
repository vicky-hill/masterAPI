import { Op } from 'sequelize';
import { Feature, Project, Req } from '../models'
import validate from '../utils/validation'


export const getReqsByFeatureId = async (featureId: string, userId: string) => {
    const feature = await Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
        include: [
            {
                model: Feature,
                as: 'subFeatures',
                required: false,
                include: [Req.scope('latest')]
            },
            Req.scope('latest')
        ]
    })

    await feature.checkAccess(userId);

    return feature;
}

export const getReqById = async (reqId: string, userId: string) => {
    const req = await Req.scope('full').findByPk(reqId, {
        rejectOnEmpty: new Error('Req not found')
    })

    await req.checkAccess(userId);

    return req;
}

export const getReqByKey = async (projectKey: string, reqKey: string, userId: string) => {
    const project = await Project.findOne({
        rejectOnEmpty: new Error('Req not found'),
        where: { projectKey },
        include: [{
            model: Req.scope('latest'),
            where: { key: reqKey }
        }]
    })

    await project.checkAccess(userId);

    if (!project.reqs) throw new Error('Reqs not included in project');

    return project.reqs[0];
}

export const createReq = async (data: { title?: string, text: string, featureId: number }, userId: string) => {
    await validate.createReq(data);

    const feature = await Feature.findByPk(data.featureId, {
        rejectOnEmpty: new Error('Feature not found, cannot create req for non existing feature'),
        include: Project
    })

    await feature.checkAccess(userId);

    const featureReqCount = await Req.count({
        where: { featureId: feature.featureId, changedReq: null }
    })

    const projectReqCount = await Req.count({
        where: { projectId: feature.projectId, changedReq: null }
    })

    if (!feature.project) throw new Error('Project not included in feature');

    const projectId = feature.projectId;
    const sort = featureReqCount + 1;
    const key = `${feature.project.reqKey}-${(projectReqCount + 1).toString().padStart(3, '0')}`


    const { reqId } = await Req.create(
        { ...data, projectId, sort, key },
        { fields: ['title', 'text', 'featureId'] }
    );

    const requirement = await Req.getReqById(reqId);
    return requirement;
}

export const updateReq = async (data: { title?: string, text?: string, details?: string }, reqId: string, userId: string) => {
    await validate.updateReq(data);

    const req = await Req.getReqById(reqId, userId);
    await req.update(data, { fields: ['title', 'text', 'details'] });

    return req;
}

export const deleteReq = async (reqId: string, userId: string) => {
    const req = await Req.getReqById(reqId, userId);
    await req.destroy();

    return req;
}

export const changeReq = async (data: { title?: string, text: string }, reqId: string, userId: string) => {
    await validate.updateReq(data);

    const changedReq = await Req.getReqById(reqId, userId);

    const newReq = {
        key: changedReq.key,
        title: changedReq.title,
        text: changedReq.text,
        projectId: changedReq.projectId,
        featureId: changedReq.featureId,
        sort: changedReq.sort
    };

    if (data.title) newReq.title = data.title;
    if (data.text) newReq.text = data.text;

    const { reqId: newReqId } = await Req.create(newReq);

    await changedReq.update({ changedReq: changedReq.key })

    await Req.update(
        { latestReqId: newReqId },
        { where: { key: changedReq.key, changedReq: { [Op.ne]: null } } }
    )

    const req = await Req.getReqById(newReqId);
    return req;
}

export const sortReqs = async (data: { reqId: number, sort: number }[]) => {
    await validate.sort(data);

    await Promise.all(data.map(({ reqId, sort }) => {
        Req.update(
            { sort },
            { where: { reqId } }
        )
    }));

    return 'sorted';
}

export const searchReqs = async (projectId: string, term: string, userId: string) => {
    await Project.checkAccess(projectId, userId);

    const allReqs = await Req.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { title: { [Op.like]: `%${term}%` } },
                        { text: { [Op.like]: `%${term}%` } }
                    ]
                },
                { projectId }
            ]
        },
        include: Project
    })

    const reqs = allReqs.filter(req => !req.changedReq);
    const history = allReqs.filter(req => req.changedReq);

    return { reqs, history };
}