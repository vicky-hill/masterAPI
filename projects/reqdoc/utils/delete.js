const Feature = require('../features/features.model')
const Project = require('../projects/projects.model')
const Req = require('../reqs/reqs.model')

const Delete = () => {
    cascadeDeleteReq()
    cascadeDeleteFeature()
    cascadeDeleteProject()
}


const cascadeDeleteReq = async (reqID) => {
    const deletedReq = await Req.findByIdAndUpdate(reqID, { deleted: new Date() }, { new: true});
    await Req.updateMany({ changed_req: deletedReq.key, project: deletedReq.project }, { $set: { deleted: new Date() }})
  
    return deletedReq;
}

const cascadeDeleteFeature = async (featureID) => {
    const deletedFeature = await Feature.findByIdAndUpdate(featureID, { deleted: new Date() });
    await Req.updateMany({ feature: featureID }, { deleted: new Date() });

    return deletedFeature;
}

const cascadeDeleteProject = async (projectID) => {
    const deletedProject = await Project.findByIdAndUpdate(projectID, { deleted: new Date() });
    await Feature.updateMany({ project: projectID }, { deleted: new Date() });
    await Req.updateMany({ project: projectID }, { deleted: new Date() });
    
    return deletedProject;
}

module.exports = {
    cascadeDeleteReq,
    cascadeDeleteFeature,
    cascadeDeleteProject
}