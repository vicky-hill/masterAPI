const Feature = require('../features/features.model')
const Project = require('../projects/projects.model')
const Req = require('../reqs/reqs.model')
const Step = require('../steps/steps.model')


const cascadeDeleteReq = async (reqID) => {
    const deletedReq = await Req.findByIdAndUpdate(reqID, { deleted: true }, { new: true});
    await Req.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: true }})
    await Step.updateMany({ req: reqID }, { $set: { deleted: true } });

    return deletedReq;
}

const cascadeDeleteFeature = async (featureID) => {
    const deletedFeature = await Feature.findByIdAndUpdate(featureID, { deleted: true });
    await Step.updateMany({ feature: featureID }, { $set: { deleted: true } });
    await Req.updateMany({ feature: featureID }, { deleted: true });

    return deletedFeature;
}

const cascadeDeleteProject = async (projectID) => {
    const deletedProject = await Project.findByIdAndUpdate(projectID, { deleted: true });
    await Feature.updateMany({ project: projectID }, { deleted: true });
    await Req.updateMany({ project: projectID }, { deleted: true });
    await Step.updateMany({ project: projectID }, { $set: { deleted: true } });
    
    return deletedProject;
}

module.exports = {
    cascadeDeleteReq,
    cascadeDeleteFeature,
    cascadeDeleteProject
}