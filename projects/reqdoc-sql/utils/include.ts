import { FeatureModel, ProjectModel, ReqModel, TeamModel } from '../models'

export const featureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const subFeatureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const mainFeatureAttributes = ['featureId', 'projectId', 'name'];
export const reqAttributes = ['reqId', 'projectId', 'featureId', 'key', 'title', 'text', 'details', 'status']
export const projectAttributes = ['projectId', 'name', 'projectKey', 'key'];

export const includeProjects = {
    model: ProjectModel,
    as: 'projects',
    required: false,
    attributes: projectAttributes
}


export const includeSubFeatures = {
    model: FeatureModel,
    as: 'subFeatures',
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
    required: false,
    attributes: featureAttributes,
    include: [includeSubFeatures]
}


export const includeReqs = {
    model: ReqModel,
    as: 'reqs',
    required: false,
    where: { changedReq: null },
    attributes: reqAttributes
}

export const includeTeam = {
    model: TeamModel,
    as: 'team'
}

export const orderSubFeatures: any = [{ model: FeatureModel, as: 'subFeatures' }, 'sort', 'ASC'];
export const orderReqs: any = [{ model: ReqModel, as: 'reqs' }, 'sort', 'ASC'];