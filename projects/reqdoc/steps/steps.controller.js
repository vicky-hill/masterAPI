const Step = require('./steps.model')
const Req = require('../reqs/reqs.model')
const validate = require('../utils/validation')

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

        await validate.createStep(req.body);

        const steps = await Step.find({ req: reqID });

        const step = await Step.create({ text, req: reqID, sort: steps.length + 1 })

        res.json(step);
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

        const step = await Step.findByIdAndDelete(stepID);

        const requirement = await Req.findById(step.req)
            .populate({
                path: 'steps',
                select: 'text',
                options: { sort: { createdAt: 'asc' } }
            })

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