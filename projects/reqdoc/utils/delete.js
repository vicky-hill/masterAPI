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

module.exports = {
    cascadeDeleteReq,
    cascadeDeleteFeature
}