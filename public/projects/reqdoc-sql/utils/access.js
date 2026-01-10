"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectAccess = exports.checkFeatureAccess = void 0;
const checkFeatureAccess = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //     const feature = await FeatureModel.findByPk(featureId, {
    //         include: [{
    //             model: ProjectModel,
    //             as: 'project',
    //             include: [{
    //                 model: TeamModel,
    //                 as: 'team',
    //                 include: [{
    //                     model: UserModel,
    //                     as: 'users',
    //                     attributes: ['userId']
    //                 }]
    //             }]
    //         }]
    //     })
    // 
    //     if (!feature) return throwError('Feature not found');
    //     if (feature.deleted) throwError('Feature was deleted');
    //     if (!feature.get({ plain: true }).project?.team?.users.map(user => user.userId).includes(userId)) throwError('User is not part of project team', { status: 401 });
});
exports.checkFeatureAccess = checkFeatureAccess;
const checkProjectAccess = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    //     const project = await ProjectModel.findByPk(projectId, {
    //         include: [{
    //             model: TeamModel,
    //             as: 'team',
    //             include: [{
    //                 model: UserModel,
    //                 as: 'users',
    //                 attributes: ['userId']
    //             }]
    //         }]
    //     })
    // 
    //     if (!project) return throwError('Project not found');
    //     if (project.deleted) throwError('Project was deleted');
    //    if (!project.get({ plain: true }).team?.users.map(user => user.userId).includes(userId)) throwError('User is not part of project team', { status: 401 });
});
exports.checkProjectAccess = checkProjectAccess;
// export const checkReqAccess = async (reqId: string, userId: string) => {
//     const requirement: ReqAttributes | null = await Req
//         .findById(reqId)
//         .populate({
//             path: 'feature',
//             select: 'name',
//             populate: {
//                 path: 'project',
//                 select: 'name',
//                 populate: {
//                     path: 'team', select: 'users'
//                 }
//             }
//         })
// 
//     if (!requirement) return throwError('Req not found');
//     if (requirement.deleted) throwError('Requirement was deleted');
//     if (!requirement.feature.project.team.users.map(user => user.user.toString()).includes(userId.toString())) throwError('User is not part of this team', { status: 401 });
// }
// export const checkCommentAccess = async (commentId: string, userId: string) => {
//     const requirement: ReqAttributes | null = await Req.findOne({ "comments._id": commentId });
//     
//     if (!requirement) return throwError('Req not found');
//     const comment = requirement.comments.find(comment => comment._id.toString() === commentId);
// 
//     if (!comment) return throwError('Comment not found');
//     if (comment.deleted) throwError('Comment was deleted');
//     if (comment.user.toString() !== userId.toString()) throwError('User is not authorized to edit or delete this comment');
// }
