const Req = require('./reqs.model')
const Feature = require('../features/features.model')
const throwError = require('../../../utils/throwError')
const validate = require('../utils/validation')
const { getReqByID } = require('./reqs.utils')
const { checkFeatureAccess, checkReqAccess, checkCommentAccess, checkProjectAccess } = require('../utils/access')
const { history, features, feature, subFeatures, project, comments, reqs: reqsPopulate } = require('../utils/populate')
const { cascadeDeleteReq } = require('../utils/delete')

const Project = require('../projects/projects.model')

const ReqController = () => {
    getFeatureReqs()
    getProjectReqs()

    getReqById()
    getReqByKey()
    createReq()
    updateReq()
    deleteReq()

    // Actions
    changeReq()
    sortReqs()
    searchReqs()

    // Comments
    addComment()
    editComment()
    deleteComment()
}

/**
 * Get feature reqs
 * @param {objectId} featureID 
 * @returns {array<Req>}
 */
const getFeatureReqs = async (req, res, next) => {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;

        await checkFeatureAccess(featureID, userID);

        const feature = await Feature.findById(featureID)
            .populate({
                ...subFeatures,
                populate: reqsPopulate
            })

        const reqs = await Req
            .find({ feature: featureID, changed_req: { $exists: false } })
            .populate([history, features])
            .sort({ sort: 1 });

        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();

        res.json({ data: [...reqs, ...subFeatureReqs] });
    } catch (err) {
        err.ctrl = getFeatureReqs;
        next(err);
    }
}

/**
 * Get project reqs
 * @param {objectId} projectID 
 * @returns {array<Req>}
 */
const getProjectReqs = async (req, res, next) => {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;

        await checkProjectAccess(projectID, userID);

        const reqs = await Req
            .find({ project: projectID, changed_req: { $exists: false } })
            .populate([history])
            .sort({ sort: 1 });

        res.json({ data: [...reqs] });
    } catch (err) {
        err.ctrl = getProjectReqs;
        next(err);
    }
}

/**
 * Get req by ID
 * @param  reqID
 * @returns {Req}
 */
const getReqById = async (req, res, next) => {
    try {
        const { userID } = req.user;
        const { reqID } = req.params;

        await checkReqAccess(reqID, userID);

        const requirement = await getReqByID(reqID);

        res.json(requirement);
    } catch (err) {
        err.ctrl = getReqById;
        next(err);
    }
}

/**
 * Get req by key
 * @param  {reqKey}
 * @param  {projectKey}
 * @returns {Req}
 */
const getReqByKey = async (req, res, next) => {
    try {
        const { userID } = req.user;
        const { reqKey, projectKey } = req.params;

        const project = await Project.findOne({ slug: projectKey })

        const requirement = await Req
            .findOne({
                changed_req: { $exists: false },
                key: { $regex: new RegExp(reqKey, 'i') },
                project: project._id
            })
            .populate([history, comments, feature]);

        if (!requirement) throwError('Requirement not found');

        await checkReqAccess(requirement._id, userID);

        res.json(requirement);
    } catch (err) {
        err.ctrl = getReqByKey;
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

        const feature = await Feature
            .findById(featureID)
            .populate({ path: 'project', select: 'key' })

        if (!feature) throwError(`Feature with _id ${featureID} does not exist, can't create req for non existing feature`);

        const allProjectReqs = await Req.find({ project: feature.project, changed_req: { $exists: false } });
        const keyNumber = allProjectReqs.length + 1;

        const requirement = await Req.create({
            ...req.body,
            key: `${feature.project.key}-${keyNumber.toString().padStart(3, 0)}`,
            sort: reqs.length,
            project: feature.project
        });

        res.json(requirement);
    } catch (err) {
        err.ctrl = createReq;
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

        if (!updatedReq) throwError(`Req not found: ${reqID}`);

        const requirement = await getReqByID(updatedReq._id);

        res.status(200).json(requirement);
    } catch (err) {
        err.ctrl = updateReq;
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
        err.ctrl = deleteReq;
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

        const latestReq = await getReqByID(_id)

        res.json(latestReq);
    } catch (err) {
        err.ctrl = changeReq;
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
        err.ctrl = sortReqs;
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
        err.ctrl = searchReqs;
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
        err.ctrl = addComment;
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
        err.ctrl = editComment;
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
        err.ctrl = deleteComment;
        next(err);
    }
}

module.exports = {
    getFeatureReqs,
    getProjectReqs,
    getReqById,
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