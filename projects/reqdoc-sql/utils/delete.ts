import Feature from '../features/features.model'
import ReqModel from '../reqs/reqs.model'

// export const cascadeDeleteReq = async (reqId: string) => {
//     const deletedReq: ReqAttributes | null = await Req.findByIdAndUpdate(reqId, { deleted: new Date() }, { new: true });
//     if (!deletedReq) return throwError('Req not found');
//     await Req.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: new Date() } })
// 
//     return deletedReq;
// }

export const cascadeDeleteFeature = async (featureId: string) => {
//     const feature = await Feature.findByPk(featureId);
//     if (!feature) throw new Error('Feature not found');
// 
//     feature.deleted = new Date();
//     await feature.save();
// 
//     await ReqModel.update(
//         { deleted: new Date() },
//         { where: { featureId }}
//     )
// 
//     return feature;
}

// export const cascadeDeleteProject = async (projectId: string) => {
//     const deletedProject: ProjectAttributes | null = await Project.findByIdAndUpdate(projectId, { deleted: new Date() });
//     if (!deletedProject) return throwError('Project not found');
//     await Feature.updateMany({ project: projectId }, { deleted: new Date() });
//     await Req.updateMany({ project: projectId }, { deleted: new Date() });
// 
//     return deletedProject;
// }