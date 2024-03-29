const Step = require('./steps.model')
const Req = require('../reqs/reqs.model')
const validate = require('../utils/validation')
const { checkReqAccess, checkStepAccess } = require('../utils/access')
const { steps } = require('../utils/populate');

/**
 * Create a step
 * @param reqID
 * @property {string} req.body.text 
 * @returns {Step}
 */
const createStep = async (req, res, next) => {
    try {
        const { reqID } = req.params;
        const { text } = req.body;
       const { userID } = req.user;

        await checkReqAccess(reqID, userID);

        await validate.createStep(req.body);

        const requirement = await Req.findById(reqID)
            .populate(steps)

        const existingSteps = await Step.find({ req: reqID, deleted: { $exists: false } });

        const step = await Step.create({
            text,
            req: reqID,
            feature: requirement.feature,
            project: requirement.project,
            sort: existingSteps.length + 1
        });

        requirement.steps = [...requirement.steps, step]

        res.json(requirement);
    } catch (err) {
        err.errorCode = 'steps_001';
        next(err);
    }
}

/**
 * Delete a step
 * @param stepID
 * @returns {Step}
 */
const deleteStep = async (req, res, next) => {
    try {
        const { stepID } = req.params;
       const { userID } = req.user;

        await checkStepAccess(stepID, userID);

        const step = await Step.findByIdAndUpdate(stepID, { deleted: true });

        const requirement = await Req.findById(step.req)
            .populate(steps)

        res.json(requirement);
    } catch (err) {
        err.errorCode = 'steps_002';
        next(err);
    }
}

module.exports = {
    createStep,
    deleteStep
}