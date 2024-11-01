import Feature from '../features/features.model'
import Project from '../projects/projects.model'
import Req from '../reqs/reqs.model'
import throwError from '../../../utils/throwError'
import { FeatureAttributes, ProjectAttributes, ReqAttributes } from '../../../types/reqdoc/attributes.types'

export const checkFeatureAccess = async (featureId: string, userId: string) => {
    const feature: FeatureAttributes | null = await Feature
        .findById(featureId)
        .populate({
            path: 'project',
            select: 'name',
            populate: {
                path: 'team', select: 'users'
            }
        })

    if (!feature) return throwError('Feature not found');
    if (feature.deleted) throwError('Feature was deleted');
    if (!feature.project.team.users.map(user => user.user.toString()).includes(userId.toString())) throwError('User is not part of this team', { status: 401 });
}

export const checkProjectAccess = async (projectId: string, userId: string) => {
    const project: ProjectAttributes | null = await Project
        .findById(projectId)
        .populate({ path: 'team', select: 'users' })

    if (!project) return throwError('Project not found');
    if (project.deleted) throwError('Project was deleted');
    if (!project.team.users.map(user => user.user.toString()).includes(userId.toString())) throwError('User is not part of this team', { status: 401 });
}

export const checkReqAccess = async (reqId: string, userId: string) => {
    const requirement: ReqAttributes | null = await Req
        .findById(reqId)
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

    if (!requirement) return throwError('Req not found');
    if (requirement.deleted) throwError('Requirement was deleted');
    if (!requirement.feature.project.team.users.map(user => user.user.toString()).includes(userId.toString())) throwError('User is not part of this team', { status: 401 });
}

export const checkCommentAccess = async (commentId: string, userId: string) => {
    const requirement: ReqAttributes | null = await Req.findOne({ "comments._id": commentId });
    
    if (!requirement) return throwError('Req not found');
    const comment = requirement.comments.find(comment => comment._id.toString() === commentId);

    if (!comment) return throwError('Comment not found');
    if (comment.deleted) throwError('Comment was deleted');
    if (comment.user.toString() !== userId.toString()) throwError('User is not authorized to edit or delete this comment');
}