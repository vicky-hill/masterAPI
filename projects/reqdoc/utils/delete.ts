import { FeatureAttributes, ProjectAttributes, ReqAttributes } from '../../../types/reqdoc/attributes.types';
import Feature from '../features/features.model'
import Project from '../projects/projects.model'
import Req from '../reqs/reqs.model'
import throwError from '../../../utils/throwError';

export const cascadeDeleteReq = async (reqId: string) => {
    const deletedReq: ReqAttributes | null = await Req.findByIdAndUpdate(reqId, { deleted: new Date() }, { new: true });
    if (!deletedReq) return throwError('Req not found');
    await Req.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: new Date() } })

    return deletedReq;
}

export const cascadeDeleteFeature = async (featureId: string) => {
    const deletedFeature: FeatureAttributes | null = await Feature.findByIdAndUpdate(featureId, { deleted: new Date() });
    if (!deletedFeature) return throwError('Feature not found');
    await Req.updateMany({ feature: featureId }, { deleted: new Date() });

    return deletedFeature;
}

export const cascadeDeleteProject = async (projectId: string) => {
    const deletedProject: ProjectAttributes | null = await Project.findByIdAndUpdate(projectId, { deleted: new Date() });
    if (!deletedProject) return throwError('Project not found');
    await Feature.updateMany({ project: projectId }, { deleted: new Date() });
    await Req.updateMany({ project: projectId }, { deleted: new Date() });

    return deletedProject;
}