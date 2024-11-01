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
exports.checkCommentAccess = exports.checkReqAccess = exports.checkProjectAccess = exports.checkFeatureAccess = void 0;
const features_model_1 = __importDefault(require("../features/features.model"));
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const checkFeatureAccess = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const feature = yield features_model_1.default
        .findById(featureId)
        .populate({
        path: 'project',
        select: 'name',
        populate: {
            path: 'team', select: 'users'
        }
    });
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    if (feature.deleted)
        (0, throwError_1.default)('Feature was deleted');
    if (!feature.project.team.users.map(user => user.user.toString()).includes(userId.toString()))
        (0, throwError_1.default)('User is not part of this team', { status: 401 });
});
exports.checkFeatureAccess = checkFeatureAccess;
const checkProjectAccess = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield projects_model_1.default
        .findById(projectId)
        .populate({ path: 'team', select: 'users' });
    if (!project)
        return (0, throwError_1.default)('Project not found');
    if (project.deleted)
        (0, throwError_1.default)('Project was deleted');
    if (!project.team.users.map(user => user.user.toString()).includes(userId.toString()))
        (0, throwError_1.default)('User is not part of this team', { status: 401 });
});
exports.checkProjectAccess = checkProjectAccess;
const checkReqAccess = (reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const requirement = yield reqs_model_1.default
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
    });
    if (!requirement)
        return (0, throwError_1.default)('Req not found');
    if (requirement.deleted)
        (0, throwError_1.default)('Requirement was deleted');
    if (!requirement.feature.project.team.users.map(user => user.user.toString()).includes(userId.toString()))
        (0, throwError_1.default)('User is not part of this team', { status: 401 });
});
exports.checkReqAccess = checkReqAccess;
const checkCommentAccess = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const requirement = yield reqs_model_1.default.findOne({ "comments._id": commentId });
    if (!requirement)
        return (0, throwError_1.default)('Req not found');
    const comment = requirement.comments.find(comment => comment._id.toString() === commentId);
    if (!comment)
        return (0, throwError_1.default)('Comment not found');
    if (comment.deleted)
        (0, throwError_1.default)('Comment was deleted');
    if (comment.user.toString() !== userId.toString())
        (0, throwError_1.default)('User is not authorized to edit or delete this comment');
});
exports.checkCommentAccess = checkCommentAccess;
