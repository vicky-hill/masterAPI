import { FeatureModel, ReqModel, TeamModel } from '../models'

export const featureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const subFeatureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const mainFeatureAttributes = ['featureId', 'projectId', 'name'];
export const reqAttributes = ['reqId', 'projectId', 'featureId', 'key', 'title', 'text', 'details', 'status']


export const includeSubFeatures = {
    model: FeatureModel,
    as: 'subFeatures',
    where: { deleted: null },
    required: false,
    attributes: subFeatureAttributes
}

export const includeMainFeature = {
    model: FeatureModel,
    as: 'mainFeature',
    attributes: mainFeatureAttributes
}

export const includeFeatures = {
    model: FeatureModel,
    as: 'features',
    where: { deleted: null },
    required: false,
    attributes: featureAttributes,
    include: [includeSubFeatures]
}

export const includeReqs = {
    model: ReqModel,
    as: 'reqs',
    required: false,
    where: { changedReq: null, deleted: null },
    attributes: reqAttributes
}

export const includeTeam = {
    model: TeamModel,
    as: 'team'
}

export const orderSubFeatures: any = [{ model: FeatureModel, as: 'subFeatures' }, 'sort', 'ASC'];
export const orderReqs: any = [{ model: ReqModel, as: 'reqs' }, 'sort', 'ASC'];