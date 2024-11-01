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
exports.cascadeDeleteProject = exports.cascadeDeleteFeature = exports.cascadeDeleteReq = void 0;
const features_model_1 = __importDefault(require("../features/features.model"));
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const cascadeDeleteReq = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedReq = yield reqs_model_1.default.findByIdAndUpdate(reqId, { deleted: new Date() }, { new: true });
    if (!deletedReq)
        return (0, throwError_1.default)('Req not found');
    yield reqs_model_1.default.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: new Date() } });
    return deletedReq;
});
exports.cascadeDeleteReq = cascadeDeleteReq;
const cascadeDeleteFeature = (featureId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedFeature = yield features_model_1.default.findByIdAndUpdate(featureId, { deleted: new Date() });
    if (!deletedFeature)
        return (0, throwError_1.default)('Feature not found');
    yield reqs_model_1.default.updateMany({ feature: featureId }, { deleted: new Date() });
    return deletedFeature;
});
exports.cascadeDeleteFeature = cascadeDeleteFeature;
const cascadeDeleteProject = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedProject = yield projects_model_1.default.findByIdAndUpdate(projectId, { deleted: new Date() });
    if (!deletedProject)
        return (0, throwError_1.default)('Project not found');
    yield features_model_1.default.updateMany({ project: projectId }, { deleted: new Date() });
    yield reqs_model_1.default.updateMany({ project: projectId }, { deleted: new Date() });
    return deletedProject;
});
exports.cascadeDeleteProject = cascadeDeleteProject;
