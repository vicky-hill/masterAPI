"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.editComment = exports.addComment = exports.searchReqs = exports.sortReqs = exports.changeReq = exports.deleteReq = exports.updateReq = exports.createReq = exports.getReqByKey = exports.getReqById = exports.getProjectReqs = exports.getFeatureReqs = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const features_model_1 = __importDefault(require("../features/features.model"));
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const access_1 = require("../utils/access");
const populate_1 = require("../utils/populate");
const reqs_model_1 = __importDefault(require("./reqs.model"));
const reqs_utils_1 = require("./reqs.utils");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const getFeatureReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        const feature = yield features_model_1.default.findById(featureID)
            .populate(Object.assign(Object.assign({}, populate_1.subFeatures), { populate: populate_1.reqs }));
        if (!feature)
            return (0, throwError_1.default)('Feature not found');
        const reqs = yield reqs_model_1.default
            .find({ feature: featureID, changed_req: { $exists: false } })
            // .populate([history, features])
            .populate([populate_1.history])
            .sort({ sort: 1 });
        const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();
        res.json({ data: [...reqs, ...subFeatureReqs] });
    }
    catch (err) {
        err.ctrl = exports.getFeatureReqs;
        next(err);
    }
});
exports.getFeatureReqs = getFeatureReqs;
const getProjectReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkProjectAccess)(projectID, userID);
        const reqs = yield reqs_model_1.default
            .find({ project: projectID, changed_req: { $exists: false } })
            .populate([populate_1.history])
            .sort({ sort: 1 });
        res.json({ data: [...reqs] });
    }
    catch (err) {
        err.ctrl = exports.getProjectReqs;
        next(err);
    }
});
exports.getProjectReqs = getProjectReqs;
const getReqById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.user;
        const { reqID } = req.params;
        yield (0, access_1.checkReqAccess)(reqID, userID);
        const requirement = yield (0, reqs_utils_1.findReqByID)(reqID);
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.getReqById;
        next(err);
    }
});
exports.getReqById = getReqById;
const getReqByKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.user;
        const { reqKey, projectKey } = req.params;
        const project = yield projects_model_1.default.findOne({ slug: projectKey });
        if (!project)
            return (0, throwError_1.default)('Project not found');
        const requirement = yield reqs_model_1.default
            .findOne({
            changed_req: { $exists: false },
            key: { $regex: new RegExp(reqKey, 'i') },
            project: project._id
        })
            .populate([populate_1.history, populate_1.comments, populate_1.feature]);
        if (!requirement)
            return (0, throwError_1.default)('Req not found');
        yield (0, access_1.checkReqAccess)(requirement._id, userID);
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.getReqByKey;
        next(err);
    }
});
exports.getReqByKey = getReqByKey;
const createReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const featureID = req.body.feature;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        yield validation_1.default.createReq(req.body);
        const reqs = yield reqs_model_1.default.find({ feature: featureID, changed_req: { $exists: false } });
        const feature = yield features_model_1.default
            .findById(featureID)
            .populate({ path: 'project', select: 'key' });
        if (!feature)
            return (0, throwError_1.default)(`Feature with _id ${featureID} does not exist, can't create req for non existing feature`);
        const allProjectReqs = yield reqs_model_1.default.find({ project: feature.project, changed_req: { $exists: false } });
        const keyNumber = allProjectReqs.length + 1;
        const requirement = yield reqs_model_1.default.create(Object.assign(Object.assign({}, req.body), { key: `${feature.project.key}-${keyNumber.toString().padStart(3, '0')}`, sort: reqs.length, project: feature.project }));
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.createReq;
        next(err);
    }
});
exports.createReq = createReq;
const updateReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { reqID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkReqAccess)(reqID, userID);
        yield validation_1.default.updateReq(req.body);
        const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(reqID, req.body, { new: true });
        if (!updatedReq)
            return (0, throwError_1.default)(`Req not found: ${reqID}`);
        const requirement = yield (0, reqs_utils_1.findReqByID)(updatedReq._id);
        res.status(200).json(requirement);
    }
    catch (err) {
        err.ctrl = exports.updateReq;
        next(err);
    }
});
exports.updateReq = updateReq;
const deleteReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqID = req.params.reqID;
        const { userID } = req.user;
        yield (0, access_1.checkReqAccess)(reqID, userID);
        const deletedReq = yield (0, delete_1.cascadeDeleteReq)(reqID);
        res.status(200).json(deletedReq);
    }
    catch (err) {
        err.ctrl = exports.deleteReq;
        next(err);
    }
});
exports.deleteReq = deleteReq;
const changeReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { reqID } = req.params;
        const { title, text } = req.body;
        const { userID } = req.user;
        yield (0, access_1.checkReqAccess)(reqID, userID);
        yield validation_1.default.updateReq(req.body);
        const changedReq = yield reqs_model_1.default.findById(reqID);
        if (!changedReq)
            return (0, throwError_1.default)('Req not found');
        const newReq = {
            key: changedReq.key,
            title: changedReq.title,
            text: changedReq.text,
            project: changedReq.project,
            feature: changedReq.feature,
            sort: changedReq.sort
        };
        if (title)
            newReq.title = title;
        if (text)
            newReq.text = text;
        const { _id } = yield reqs_model_1.default.create(newReq);
        console.log({ changed_req: changedReq.key });
        yield reqs_model_1.default.findByIdAndUpdate(reqID, { changed_req: changedReq.key }, { new: true });
        yield reqs_model_1.default.updateMany({ key: changedReq.key, changed_req: { $exists: true } }, { latest_req: _id }, { new: true });
        const latestReq = yield (0, reqs_utils_1.findReqByID)(_id);
        res.json(latestReq);
    }
    catch (err) {
        err.ctrl = exports.changeReq;
        next(err);
    }
});
exports.changeReq = changeReq;
const sortReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        yield validation_1.default.sort(req.body);
        const { userID } = req.user;
        yield (0, access_1.checkReqAccess)(req.body[0]._id, userID);
        const data = [];
        for (const requirement of req.body) {
            const { _id, sort } = requirement;
            const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedReq);
        }
        res.json({ data });
    }
    catch (err) {
        err.ctrl = exports.sortReqs;
        next(err);
    }
});
exports.sortReqs = sortReqs;
const searchReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term } = req.query;
        const { projectID } = req.params;
        const reqs = yield reqs_model_1.default.find({
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
        }).populate(populate_1.project);
        const history = yield reqs_model_1.default.find({
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
        }).populate(populate_1.project);
        res.json({ data: { reqs, history } });
    }
    catch (err) {
        err.ctrl = exports.searchReqs;
        next(err);
    }
});
exports.searchReqs = searchReqs;
const addComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { _id: user } = req.user;
        const { reqID } = req.params;
        const { text } = req.body;
        const comment = { user, text };
        yield (0, access_1.checkReqAccess)(reqID, user);
        yield validation_1.default.addComment(comment);
        const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(reqID, { $push: { comments: comment } }, { new: true }).populate([populate_1.history, populate_1.comments]);
        if (!exports.updateReq)
            return (0, throwError_1.default)('Req not found');
        res.json(updatedReq);
    }
    catch (err) {
        err.ctrl = exports.addComment;
        next(err);
    }
});
exports.addComment = addComment;
const editComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: user } = req.user;
        const { commentID } = req.params;
        const { text } = req.body;
        yield (0, access_1.checkCommentAccess)(commentID, user);
        yield validation_1.default.editComment(req.body);
        const updatedReq = yield reqs_model_1.default.findOneAndUpdate({ "comments._id": commentID }, { "$set": { "comments.$.text": text, "comments.$.edited": true } }, { new: true })
            .populate([populate_1.history, populate_1.comments]);
        if (!updatedReq)
            return (0, throwError_1.default)('Req not found');
        res.json(updatedReq);
    }
    catch (err) {
        err.ctrl = exports.editComment;
        next(err);
    }
});
exports.editComment = editComment;
const deleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { _id: user } = req.user;
        const { commentID } = req.params;
        yield (0, access_1.checkCommentAccess)(commentID, user);
        const updatedReq = yield reqs_model_1.default.findOneAndUpdate({ "comments._id": commentID }, { "$set": { "comments.$.deleted": new Date(), "comments.$.edit": true } }, { new: true })
            .populate([populate_1.history, populate_1.comments]);
        if (!updatedReq)
            return (0, throwError_1.default)('Req not found');
        res.json(updatedReq);
    }
    catch (err) {
        err.ctrl = exports.deleteComment;
        next(err);
    }
});
exports.deleteComment = deleteComment;
