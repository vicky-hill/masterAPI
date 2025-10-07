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
exports.cascadeDeleteFeature = void 0;
const features_model_1 = __importDefault(require("../features/features.model"));
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
// export const cascadeDeleteReq = async (reqId: string) => {
//     const deletedReq: ReqAttributes | null = await Req.findByIdAndUpdate(reqId, { deleted: new Date() }, { new: true });
//     if (!deletedReq) return throwError('Req not found');
//     await Req.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: new Date() } })
// 
//     return deletedReq;
// }
const cascadeDeleteFeature = (featureId) => __awaiter(void 0, void 0, void 0, function* () {
    const feature = yield features_model_1.default.findByPk(featureId);
    if (!feature)
        throw new Error('Feature not found');
    feature.deleted = new Date();
    yield feature.save();
    yield reqs_model_1.default.update({ deleted: new Date() }, { where: { featureId } });
    return feature;
});
exports.cascadeDeleteFeature = cascadeDeleteFeature;
// export const cascadeDeleteProject = async (projectId: string) => {
//     const deletedProject: ProjectAttributes | null = await Project.findByIdAndUpdate(projectId, { deleted: new Date() });
//     if (!deletedProject) return throwError('Project not found');
//     await Feature.updateMany({ project: projectId }, { deleted: new Date() });
//     await Req.updateMany({ project: projectId }, { deleted: new Date() });
// 
//     return deletedProject;
// }
