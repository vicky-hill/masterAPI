import { Feature, Project, Req, Team } from '../models'

export const featureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const subFeatureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
export const mainFeatureAttributes = ['featureId', 'projectId', 'name'];
export const reqAttributes = ['reqId', 'projectId', 'featureId', 'key', 'title', 'text', 'details', 'status']
export const projectAttributes = ['projectId', 'name', 'projectKey', 'key'];

export const includeProjects = {
    model: Project,
    as: 'projects',
    required: false,
    attributes: projectAttributes
}

export const includeSubFeatures = {
    model: Feature,
    as: 'subFeatures',
    required: false,
    attributes: subFeatureAttributes
}

export const includeMainFeature = {
    model: Feature,
    as: 'mainFeature',
    attributes: mainFeatureAttributes
}

export const includeFeatures = {
    model: Feature,
    required: false,
    attributes: featureAttributes,
    include: [includeSubFeatures]
}


export const includeReqs = {
    model: Req,
    as: 'reqs',
    required: false,
    where: { changedReq: null },
    attributes: reqAttributes
}

export const includeTeam = {
    model: Team,
    as: 'team'
}

export const orderSubFeatures: any = [{ model: Feature, as: 'subFeatures' }, 'sort', 'ASC'];
export const orderReqs: any = [{ model: Req, as: 'reqs' }, 'sort', 'ASC'];