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
const access_1 = require("../utils/access");
const populate_1 = require("../utils/populate");
const reqs_model_1 = __importDefault(require("./reqs.model"));
const reqs_utils_1 = require("./reqs.utils");
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const features_utils_1 = require("../features/features.utils");
const getFeatureReqs = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // const cacheKey = `reqs:feature:${featureId}`;
    // const cached = await getValue(cacheKey);
    // if (cached) return cached;
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const feature = yield features_model_1.default.findById(featureId)
        .populate(Object.assign(Object.assign({}, populate_1.subFeatures), { populate: populate_1.reqs }));
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    const reqs = yield reqs_model_1.default
        .find({ feature: featureId, changed_req: { $exists: false } })
        // .populate([history, features])
        .populate([populate_1.history])
        .sort({ sort: 1 });
    const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();
    // await setValue(cacheKey, [...reqs, ...subFeatureReqs]);
    return { data: [...reqs, ...subFeatureReqs] };
});
exports.getFeatureReqs = getFeatureReqs;
const getProjectReqs = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    const reqs = yield reqs_model_1.default
        .find({ project: projectId, changed_req: { $exists: false } })
        .populate([populate_1.history])
        .sort({ sort: 1 });
    return { data: [...reqs] };
});
exports.getProjectReqs = getProjectReqs;
const getReqById = (reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkReqAccess)(reqId, userId);
    const requirement = yield (0, reqs_utils_1.findReqByID)(reqId);
    return requirement;
});
exports.getReqById = getReqById;
const getReqByKey = (reqKey, projectKey, userId) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield (0, access_1.checkReqAccess)(requirement._id, userId);
    return requirement;
});
exports.getReqByKey = getReqByKey;
const createReq = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.createReq(data);
    const reqs = yield reqs_model_1.default.find({ feature: featureId, changed_req: { $exists: false } });
    const feature = yield features_model_1.default
        .findById(featureId)
        .populate({ path: 'project', select: 'key' });
    if (!feature)
        return (0, throwError_1.default)(`Feature with _id ${featureId} does not exist, can't create req for non existing feature`);
    const allProjectReqs = yield reqs_model_1.default.find({ project: feature.project, changed_req: { $exists: false } });
    const keyNumber = allProjectReqs.length + 1;
    const newReq = yield reqs_model_1.default.create(Object.assign(Object.assign({}, data), { key: `${feature.project.key}-${keyNumber.toString().padStart(3, '0')}`, sort: reqs.length, project: feature.project }));
    const requirement = yield (0, reqs_utils_1.findReqByID)(newReq._id);
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return requirement;
});
exports.createReq = createReq;
const updateReq = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkReqAccess)(reqId, userId);
    yield validation_1.default.updateReq(data);
    const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(reqId, data, { new: true });
    if (!updatedReq)
        return (0, throwError_1.default)(`Req not found: ${reqId}`);
    const requirement = yield (0, reqs_utils_1.findReqByID)(updatedReq._id);
    yield (0, features_utils_1.invalidateFeatureCache)(updatedReq.feature.toString());
    return requirement;
});
exports.updateReq = updateReq;
const deleteReq = (reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkReqAccess)(reqId, userId);
    const deletedReq = yield (0, delete_1.cascadeDeleteReq)(reqId);
    yield (0, features_utils_1.invalidateFeatureCache)(deletedReq.feature.toString());
    return deletedReq;
});
exports.deleteReq = deleteReq;
const changeReq = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text } = data;
    yield (0, access_1.checkReqAccess)(reqId, userId);
    yield validation_1.default.updateReq(data);
    const changedReq = yield reqs_model_1.default.findById(reqId);
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
    yield reqs_model_1.default.findByIdAndUpdate(reqId, { changed_req: changedReq.key }, { new: true });
    yield reqs_model_1.default.updateMany({ key: changedReq.key, changed_req: { $exists: true } }, { latest_req: _id }, { new: true });
    const latestReq = yield (0, reqs_utils_1.findReqByID)(_id);
    yield (0, features_utils_1.invalidateFeatureCache)(changedReq.feature.toString());
    return latestReq;
});
exports.changeReq = changeReq;
const sortReqs = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    data;
    yield validation_1.default.sort(data);
    yield (0, access_1.checkReqAccess)(data[0]._id, userId);
    const reqs = [];
    for (const requirement of data) {
        const { _id, sort } = requirement;
        const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(_id, { sort }, { new: true, populate: 'feature' });
        updatedReq && reqs.push(updatedReq);
    }
    const mainFeatureId = reqs[0].feature.main_feature
        ? reqs[0].feature.main_feature.toString()
        : reqs[0].feature._id.toString();
    yield (0, features_utils_1.invalidateFeatureCache)(mainFeatureId);
    return reqs;
});
exports.sortReqs = sortReqs;
const searchReqs = (projectId, term) => __awaiter(void 0, void 0, void 0, function* () {
    const reqs = yield reqs_model_1.default.find({
        $and: [
            {
                $or: [
                    { title: { $regex: term, $options: 'i' } },
                    { text: { $regex: term, $options: 'i' } },
                ]
            },
            { project: projectId },
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
            { project: projectId },
            { deleted: { $exists: false } },
            { changed_req: { $exists: true } }
        ]
    }).populate(populate_1.project);
    return { data: { reqs, history } };
});
exports.searchReqs = searchReqs;
const addComment = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = data;
    const comment = { user: userId, text };
    yield (0, access_1.checkReqAccess)(reqId, userId);
    yield validation_1.default.addComment(comment);
    const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(reqId, { $push: { comments: comment } }, { new: true }).populate([populate_1.history, populate_1.comments]);
    if (!exports.updateReq)
        return (0, throwError_1.default)('Req not found');
    return updatedReq;
});
exports.addComment = addComment;
const editComment = (data, commentID, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = data;
    yield (0, access_1.checkCommentAccess)(commentID, userId);
    yield validation_1.default.editComment(data);
    const updatedReq = yield reqs_model_1.default.findOneAndUpdate({ "comments._id": commentID }, { "$set": { "comments.$.text": text, "comments.$.edited": true } }, { new: true })
        .populate([populate_1.history, populate_1.comments]);
    if (!updatedReq)
        return (0, throwError_1.default)('Req not found');
    return updatedReq;
});
exports.editComment = editComment;
const deleteComment = (commentID, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkCommentAccess)(commentID, userId);
    const updatedReq = yield reqs_model_1.default.findOneAndUpdate({ "comments._id": commentID }, { "$set": { "comments.$.deleted": new Date(), "comments.$.edit": true } }, { new: true })
        .populate([populate_1.history, populate_1.comments]);
    if (!updatedReq)
        return (0, throwError_1.default)('Req not found');
    return updatedReq;
});
exports.deleteComment = deleteComment;
