const Feature = require('../features/features.model')
const Project = require('../projects/projects.model')
const Req = require('../reqs/reqs.model')
const Step = require('../steps/steps.model')


const cascadeDeleteReq = async (reqID) => {
    const deletedReq = await Req.findByIdAndUpdate(reqID, { deleted: true });
    await Step.updateMany({ req: reqID }, { $set: { deleted: true } });

    return deletedReq;
}

const cascadeDeleteFeature = async (featureID) => {
    const deletedFeature = await Feature.findByIdAndUpdate(featureID, { deleted: true });
    const deletedReqs = await Req.find({ feature: featureID })
    
    await Req.updateMany({ feature: featureID }, { deleted: true });
    
    for (const req of deletedReqs) {
        const { _id } = req;
        await Step.updateMany({ req: _id }, { $set: { deleted: true } });
    }

    return deletedFeature;
}

const cascadeDeleteProject = async (projectID) => {
    const deletedProject = await Project.findByIdAndUpdate(projectID, { deleted: true });
    const deletedReqs = await Feature.find({ project: projectID });
    
    await Req.updateMany({ project: projectID }, { deleted: true });
    await Feature.updateMany({ project: projectID }, { deleted: true });

    for (const req of deletedReqs) {
        const { _id } = req;
        await Step.updateMany({ req: _id }, { $set: { deleted: true } });
    }
    
    return deletedProject;
}

const deleteAll = async () => {
    await Project.deleteMany({ deleted: true });
    await Req.deleteMany({ deleted: true });
    await Feature.deleteMany({ deleted: true });
    await Step.deleteMany({ deleted: true });
}


module.exports = {
    cascadeDeleteReq,
    cascadeDeleteFeature,
    cascadeDeleteProject,
    deleteAll
}