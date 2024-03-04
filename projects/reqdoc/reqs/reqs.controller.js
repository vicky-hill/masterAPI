const Req = require('./reqs.model')
const Feature = require('../features/features.model')
const throwError = require('../../../utils/throwError')
const validate = require('../utils/validation')
const { getReqByID } = require('./reqs.utils')

/**
 * Get reqs
 * @param {objectId} featureID 
 * @returns {array<Req>}
 */
const getReqs = async (req, res, next) => {
    try {
        const { featureID } = req.params;
        const feature = await Feature.findById(featureID);

        if (!feature) throwError('Feature not found');

        const reqs = await Req
            .find({ feature: featureID, changed_req: { $exists: false } })
            .populate([{
                path: 'history',
                options: { sort: { createdAt: 'desc' } }
            }, {
                path: 'steps',
                select: 'text',
                options: { sort: { createdAt: 'asc' } }
            }])
            .sort({ sort: 1 });

        res.json({ data: reqs });
    } catch (err) {
        err.errorCode = 'reqs_001';
        next(err);
    }
}

/**
 * Get req by ID
 * @param  {objectId} reqID
 * @returns {Req}
 */
const getReq = async (req, res, next) => {
    try {
        const requirement = await Req.findById(req.params.reqID).populate('history');

        if (!requirement) throwError('Requirement not found');

        res.json(requirement);
    } catch (err) {
        err.errorCode = 'reqs_002';
        next(err);
    }
}

/**
 * Create a req
 * @property {string} req.body.title 
 * @property {string} req.body.text 
 * @property {string} req.body.feature 
 * @returns {Req}
 */
const createReq = async (req, res, next) => {
    try {
        const featureID = req.body.feature;

        await validate.createReq(req.body);

        const reqs = await Req.find({ feature: featureID, changed_req: { $exists: false } });

        const feature = await Feature.findById(featureID);

        if (!feature) throwError(`Feature with _id ${featureID} does not exist, can't create req for non existing feature`);

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
        err.errorCode = 'reqs_003';
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
const updateReq = async (req, res, next) => {
    try {
        const reqID = req.params.reqID;

        await validate.updateReq(req.body);

        const updatedReq = await Req.findByIdAndUpdate(reqID, req.body, { new: true });

        if (!updatedReq) throwError(`Feature not found`);

        const requirement = await getReqByID(updatedReq._id);

        res.status(200).json(requirement);
    } catch (err) {
        err.errorCode = 'reqs_004';
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
const changeReq = async (req, res, next) => {
    try {
        const { reqID } = req.params;
        const { title, text } = req.body;

        await validate.updateReq(req.body);

        const changedReq = await Req.findById(reqID);

        if (!changeReq) throwError('Req not found');

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

        await Req.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true })
        
        res.json(latestReq);
    } catch (err) {
        err.errorCode = 'reqs_005';
        next(err);
    }
}

module.exports = {
    getReqs,
    getReq,
    createReq,
    updateReq,
    changeReq
}