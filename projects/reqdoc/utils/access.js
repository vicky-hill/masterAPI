const Feature = require('../features/features.model')
const Project = require('../projects/projects.model')
const Req = require('../reqs/reqs.model')
const Step = require('../steps/steps.model')
const throwError = require('../../../utils/throwError')

const checkFeatureAccess = async (featureID, userID) => {
    const feature = await Feature
        .findById(featureID)
        .populate({
            path: 'project',
            select: 'name',
            populate: {
                path: 'team', select: 'users'
            }
        })

    if (!feature) throwError('Feature not found');
    if (!feature.project.team.users.includes(userID)) throwError('User is not part of this team', { status: 401 });
}

const checkProjectAccess = async (projectID, userID) => {
    const project = await Project
        .findById(projectID)
        .populate({ path: 'team', select: 'users' })

    if (!project) throwError('Project not found');
    if (!project.team.users.includes(userID)) throwError('User is not part of this team', { status: 401 });
}

const checkReqAccess = async (reqID, userID) => {
    const requirement = await Req
        .findById(reqID)
        .populate({
            path: 'feature',
            select: 'name',
            populate: {
                path: 'project',
                select: 'name',
                populate: {
                    path: 'team', select: 'users'
                }
            }
        })

    if (!requirement) throwError('Req not found');
    if (!requirement.feature.project.team.users.includes(userID)) throwError('User is not part of this team', { status: 401 });
}

const checkStepAccess = async (stepID, userID) => {
    const step = await Step
        .findById(stepID)
        .populate({
            path: 'req',
            select: '_id',
            populate: {
                path: 'feature',
                select: 'name',
                populate: {
                    path: 'project',
                    select: 'name',
                    populate: {
                        path: 'team', select: 'users'
                    }
                }
            }
        })

    if (!step) throwError('Step not found');
    if (!step.req.feature.project.team.users.includes(userID)) throwError('User is not part of this team', { status: 401 });
}

module.exports = {
    checkFeatureAccess,
    checkProjectAccess,
    checkReqAccess,
    checkStepAccess
}