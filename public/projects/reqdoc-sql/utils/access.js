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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectAccess = exports.checkFeatureAccess = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const models_1 = require("../models");
const checkFeatureAccess = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const feature = yield models_1.FeatureModel.findByPk(featureId, {
        include: [{
                model: models_1.ProjectModel,
                as: 'project',
                include: [{
                        model: models_1.TeamModel,
                        as: 'team',
                        include: [{
                                model: models_1.UserModel,
                                as: 'users',
                                attributes: ['userId']
                            }]
                    }]
            }]
    });
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    if (feature.deleted)
        (0, throwError_1.default)('Feature was deleted');
    if (!((_b = (_a = feature.get({ plain: true }).project) === null || _a === void 0 ? void 0 : _a.team) === null || _b === void 0 ? void 0 : _b.users.map(user => user.userId).includes(userId)))
        (0, throwError_1.default)('User is not part of project team', { status: 401 });
});
exports.checkFeatureAccess = checkFeatureAccess;
const checkProjectAccess = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const project = yield models_1.ProjectModel.findByPk(projectId, {
        include: [{
                model: models_1.TeamModel,
                as: 'team',
                include: [{
                        model: models_1.UserModel,
                        as: 'users',
                        attributes: ['userId']
                    }]
            }]
    });
    if (!project)
        return (0, throwError_1.default)('Project not found');
    if (project.deleted)
        (0, throwError_1.default)('Project was deleted');
    if (!((_a = project.get({ plain: true }).team) === null || _a === void 0 ? void 0 : _a.users.map(user => user.userId).includes(userId)))
        (0, throwError_1.default)('User is not part of project team', { status: 401 });
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
