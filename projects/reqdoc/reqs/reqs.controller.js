const Req = require('./reqs.model')
const Feature = require('../features/features.model')
const sendError = require('../../../utils/sendError')
const validate = require('../utils/validation')

/**
 * Get reqs
 * @param {objectId} featureID 
 * @returns {array<Req>}
 */
async function getReqs(req, res, next) {
    try {
        const { featureID } = req.params;
        const feature = await Feature.findById(featureID);

        if (!feature) return sendError(next, 404, {
            error: `Feature not found`
        });

        const reqs = await Req
            .find({ feature: featureID, changed_req: { $exists: false } })
            .populate({
                path: 'history',
                options: { sort: { createdAt: 'desc' } }
            })
            .sort({ sort: 1 });

        res.json(reqs);
    } catch (err) {
        next(err);
    }
}

/**
 * Get req by ID
 * @param  {objectId} reqID
 * @returns {Req}
 */
async function getReq(req, res) {
    try {
        const requirement = await Req.findById(req.params.reqID).populate('history');

        if (!requirement) return sendError(next, 404, {
            error: `Req not found`
        });

        res.json(requirement);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a req
 * @property {string} req.body.title 
 * @property {string} req.body.text 
 * @property {string} req.body.feature 
 * @returns {Req}
 */
async function createReq(req, res, next) {
    try {
        const featureID = req.body.feature;

        await validate.createReq(req.body);

        const reqs = await Req.find({ feature: featureID, changed_req: { $exists: false } });

        const feature = await Feature.findById(featureID);

        if (!feature) return sendError(next, 404, {
            error: `Feature with _id ${featureID} does not exist, can't create req for non existing feature`
        });

        const allProjectReqs = await Req.find({ project: feature.project, changed_req: { $exists: false } });
        const keyNumber = allProjectReqs.length + 1;

        const requirement = await Req.create({
            ...req.body,
            key: `Req-${keyNumber.toString().padStart(3, 0)}`,
            sort: reqs.length,
            project: feature.project
        });

        res.json(requirement);
    } catch (err) {
        next(err);
    }
}

/**
 * Update req
 * @params id
 * @property {String} req.body.title 
 * @property {String} req.body.text 
 * @returns Req
 */
async function updateReq(req, res, next) {
    try {
        const reqID = req.params.reqID;

        await validate.updateReq(req.body);

        const updatedReq = await Req.findByIdAndUpdate(reqID, req.body, { new: true });

        if (!updatedReq) return sendError(next, 404, {
            error: `Req not found`
        });

        const requirement = await Req.findById(updatedReq._id).populate('history');

        res.status(200).json(requirement);
    } catch (err) {
        next(err);
    }
}

/**
 * Change a req
 * @param reqID
 * @property {String} title 
 * @property {String} text 
 * @returns Req 
 */
async function changeReq(req, res) {
    try {
        const { reqID } = req.params;
        const { title, text } = req.body;

        await validate.updateReq(req.body);

        const changedReq = await Req.findById(reqID);

        if (!changeReq) return sendError(next, 404, {
            error: `Req not found`
        });

        const newReq = {
            key: changedReq.key,
            title: changedReq.title,
            text: changedReq.text,
            project: changedReq.project,
            feature: changedReq.feature,
            sort: changedReq.sort
        };

        if (title) newReq.text = title;
        if (text) newReq.text = text;

        const latestReq = await Req.create(newReq);

        await Req.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true });

        res.json(latestReq);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = {
    getReqs,
    getReq,
    createReq,
    updateReq,
    changeReq
}