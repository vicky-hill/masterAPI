const Feature = require('../features/features.model')
const Project = require('../projects/projects.model')
const Req = require('../reqs/reqs.model')
const Step = require('../steps/steps.model')
const throwError = require('../../../utils/throwError')


/**
 * Delete all flagged resources
 * @returns {msg}
 */
const deleteFlagged = async (req, res, next) => {
    try {

        if (req.user.email !== 'pm@excersys.com') throwError('Not authorized, dev route only');

        await Project.deleteMany({ deleted: true });
        await Req.deleteMany({ deleted: true });
        await Feature.deleteMany({ deleted: true });
        await Step.deleteMany({ deleted: true });
        
        res.json({ msg: 'All flagged resources deleted'});
    } catch (err) {
        err.errorCode = 'projects_003';
        next(err);
    }
}

module.exports = {
    deleteFlagged
}