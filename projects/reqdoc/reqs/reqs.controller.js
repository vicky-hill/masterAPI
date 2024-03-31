const Req = require('./reqs.model')
const Feature = require('../features/features.model')
const throwError = require('../../../utils/throwError')
const validate = require('../utils/validation')
const mongoose = require('mongoose')
const { getReqByID } = require('./reqs.utils')
const { checkFeatureAccess, checkReqAccess, checkCommentAccess } = require('../utils/access')
const { cascadeDeleteReq } = require('../utils/delete')
const { history, features, subFeatures, project, comments } = require('../utils/populate')
const Project = require('../projects/projects.model')

/**
 * Get reqs
 * @param {objectId} featureID 
 * @returns {array<Req>}
 */
const getReqs = async (req, res, next) => {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const feature = await Feature.findById(featureID)
            .populate({
                ...subFeatures,
                populate: reqs
            })

        const reqs = await Req
            .find({ feature: featureID, changed_req: { $exists: false } })
            .populate([history, features])
            .sort({ sort: 1 });

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

        res.json({ data: [...reqs, ...subFeatureReqs] });
    } catch (err) {
        err.errorCode = 'reqs_001';
        next(err);
    }
}

/**
 * Get req by ID
 * @param  reqID
 * @returns {Req}
 */
const getReq = async (req, res, next) => {
    try {
        const { userID } = req.user;
        const { reqID } = req.params;

        await checkReqAccess(reqID, userID);
        
        const requirement = await Req
            .findById(reqID)
            .populate([history, comments]);

        res.json(requirement);
    } catch (err) {
        err.errorCode = 'reqs_002';
        next(err);
    }
}

/**
 * Get req by ID
 * @param  {reqKey}
 * @param  {projectKey}
 * @returns {Req}
 */
const getReqByKey = async (req, res, next) => {
    try {
        const { userID } = req.user;
        const { reqKey, projectKey } = req.params;

        const project = await Project.findOne({ key: projectKey })

        const requirement = await Req
            .findOne({
                changed_req: { $exists: false },
                key: { $regex: new RegExp(reqKey, 'i') },
                project: project._id
            })
            .populate([history, comments]);

        if (!requirement) throwError('Requirement not found');

        await checkReqAccess(requirement._id, userID);

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
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);
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
 * @params reqID
 * @property {String} req.body.title 
 * @property {String} req.body.text 
 * @property {String} req.body.details 
 * @returns Req
 */
const updateReq = async (req, res, next) => {
    try {
        const { reqID } = req.params;
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);
        await validate.updateReq(req.body);

        const updatedReq = await Req.findByIdAndUpdate(reqID, req.body, { new: true });

        if (!updatedReq) throwError(`Req not found`);

        const requirement = await getReqByID(updatedReq._id);

        res.status(200).json(requirement);
    } catch (err) {
        err.errorCode = 'reqs_004';
        next(err);
    }
}

/**
 * Delete req
 * @params reqID
 * @returns Req
 */
const deleteReq = async (req, res, next) => {
    try {
        const reqID = req.params.reqID;
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);

        const deletedReq = await cascadeDeleteReq(reqID);

        res.status(200).json(deletedReq);
    } catch (err) {
        err.errorCode = 'reqs_005';
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
        const { userID } = req.user;

        await checkReqAccess(reqID, userID);
        await validate.updateReq(req.body);

        const changedReq = await Req.findById(reqID);

        const newReq = {
            key: changedReq.key,
            title: changedReq.title,
            text: changedReq.text,
            project: changedReq.project,
            feature: changedReq.feature,
            sort: changedReq.sort
        };

        if (title) newReq.title = title;
        if (text) newReq.text = text;

        const { _id } = await Req.create(newReq)

        await Req.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true })

        await Req.updateMany(
            { key: changedReq.key, changed_req: { $exists: true } },
            { latest_req: _id },
            { new: true }
        );

        const latestReq = await Req.findById(_id)
            .populate([history]);

        res.json(latestReq);
    } catch (err) {
        err.errorCode = 'reqs_006';
        next(err);
    }
}

/**
 * Sort products
 * @get /reqs/sort
 * @property req.body [{ _id, sort }]
 * @returns { data: [{ Req }] }
 */
const sortReqs = async (req, res, next) => {
    try {
        await validate.sort(req.body);
        const { userID } = req.user;

        await checkReqAccess(req.body[0]._id, userID);

        const data = [];

        for (const requirement of req.body) {
            const { _id, sort } = requirement;
            const updatedReq = await Req.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedReq);
        }

        res.json({ data });
    } catch (err) {
        err.errorCode = 'reqs_007';
        next(err);
    }
}

/**
 * Search reqs
 * @get /reqs/search
 * @param projectID
 * @query term
 * @returns {}
 */
const searchReqs = async (req, res, next) => {
    try {
        const { term } = req.query;
        const { projectID } = req.params;

        const reqs = await Req.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: term, $options: 'i' } },
                        { text: { $regex: term, $options: 'i' } },
                    ]
                },
                { project: projectID },
                { deleted: { $exists: false } },
                { changed_req: { $exists: false } }
            ]
        }).populate(project)

        const history = await Req.find({
            $and: [
                {
                    $or: [
                        { title: { $regex: term, $options: 'i' } },
                        { text: { $regex: term, $options: 'i' } }
                    ]
                },
                { project: projectID },
                { deleted: { $exists: false } },
                { changed_req: { $exists: true } }
            ]
        }).populate(project);

        res.json({ data: { reqs, history } });
    } catch (err) {
        err.errorCode = 'reqs_008';
        next(err);
    }
}

/**
 * Add Comment
 * @param reqID
 * @property req.body.text
 * @returns {Req}
 */
const addComment = async (req, res, next) => {
    try {
        const { _id: user } = req.user;
        const { reqID } = req.params;
        const { text } = req.body;

        const comment = { user, text };

        await checkReqAccess(reqID, user);

        await validate.addComment(comment);

        const updatedReq = await Req.findByIdAndUpdate(
            reqID,
            { $push: { comments: comment } },
            { new: true }
        ).populate([history, comments]);

        res.json(updatedReq)
    } catch (err) {
        next(err);
    }
}

/**
 * Edit Comment
 * @param commentID
 * @property req.body.text
 * @returns {Req}
 */
const editComment = async (req, res, next) => {
    try {
        const { _id: user } = req.user;
        const { commentID } = req.params;
        const { text } = req.body;

        await checkCommentAccess(commentID, user);

        await validate.editComment(req.body);

        const updatedReq = await Req.findOneAndUpdate({ "comments._id": commentID },
            { "$set": { "comments.$.text": text, "comments.$.edited": true } }, { new: true })
            .populate([history, comments]);

        res.json(updatedReq);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete Comment
 * @param commentID
 * @returns {Req}
 */
const deleteComment = async (req, res, next) => {
    try {
        const { _id: user } = req.user;
        const { commentID } = req.params;

        await checkCommentAccess(commentID, user);

        const updatedReq = await Req.findOneAndUpdate({ "comments._id": commentID },
            { "$set": { "comments.$.deleted": new Date(), "comments.$.edit": true } }, { new: true })
            .populate([history, comments]);

        res.json(updatedReq);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getReqs,
    getReq,
    createReq,
    updateReq,
    changeReq,
    sortReqs,
    deleteReq,
    searchReqs,
    addComment,
    editComment,
    deleteComment,
    getReqByKey
}