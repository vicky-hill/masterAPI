const Req = require('./reqs.model')
const Feature = require('../features/features.model')
const sendError = require('../../../utils/sendError')
const validate = require('./reqs.validation')

/**
 * Get reqs
 * @param {objectId} feature 
 * @returns {array<Req>}
 */
async function getReqs(req, res, next) {
    try {
        const featureID = req.params.feature;
        const feature = await Feature.findById(featureID);

        if (!feature) return sendError(next, 404, {
            error: `Feature with _id ${featureID} does not exist`,
            message: "We're unable to locate this feature at the moment."
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
            error: `Req with _id ${req.params.reqID} does not exist`
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
 * @property {String} req.body.name 
 * @returns Req
 */
async function updateReq(req, res, next) {
    try {
        const updatedReq = await Req.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedReq) {
            return res.status(404).json({ msg: "Req not found" });
        }

        const requirement = await Req.findById(updatedReq._id);

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

        const changedReq = await Req.findById(reqID);

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


// in the error message return was what is needed for a successful req


module.exports = {
    getReqs,
    getReq,
    createReq,
    updateReq,
    changeReq
}