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
    if (feature.deleted) throwError('Feature was deleted');
    if (!feature.project.team.users.map(user => user.user.toString()).includes(userID.toString())) throwError('User is not part of this team', { status: 401 });
}

const checkProjectAccess = async (projectID, userID) => {
    const project = await Project
        .findById(projectID)
        .populate({ path: 'team', select: 'users' })

    if (!project) throwError('Project not found');
    if (project.deleted) throwError('Project was deleted');
    if (!project.team.users.map(user => user.user.toString()).includes(userID.toString())) throwError('User is not part of this team', { status: 401 });
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
    if (requirement.deleted) throwError('Requirement was deleted');
    if (!requirement.feature.project.team.users.map(user => user.user.toString()).includes(userID.toString())) throwError('User is not part of this team', { status: 401 });
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
    if (step.deleted) throwError('Step was deleted');
    if (!step.req.feature.project.team.users.map(user => user.user.toString()).includes(userID.toString())) throwError('User is not part of this team', { status: 401 });
}

const checkCommentAccess = async (commentID, userID) => {
    const requirement = await Req.findOne({ "comments._id": commentID });
    const comment = requirement.comments.find(comment => comment._id.toString() === commentID);

    if (comment.user.toString() !== userID.toString()) throwError('User is not authorized to edit or delete this comment');
}


module.exports = {
    checkFeatureAccess,
    checkProjectAccess,
    checkReqAccess,
    checkStepAccess,
    checkCommentAccess
}