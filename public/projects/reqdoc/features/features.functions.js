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
exports.sortFeatures = exports.createSubFeature = exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeature = exports.getFeatures = void 0;
const features_model_1 = __importDefault(require("./features.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const populate_1 = require("../utils/populate");
const access_1 = require("../utils/access");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const getFeatures = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const features = yield features_model_1.default
        .find({ project: projectId, deleted: { $exists: false } })
        .sort({ sort: 1 });
    return { data: features };
});
exports.getFeatures = getFeatures;
const getFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const feature = yield features_model_1.default
        .findById(featureId)
        .populate([
        populate_1.reqs,
        {
            path: 'sub_features',
            options: { sort: { sort: 'asc' } },
            populate: populate_1.reqs,
        },
        {
            path: 'main_feature',
            select: 'name'
        }
    ]);
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    const subFeatureReqs = feature.sub_features.map(subFeature => subFeature.reqs).flat();
    feature.reqs = JSON.parse(JSON.stringify([...feature.reqs.sort((a, b) => a.sort - b.sort), ...subFeatureReqs]));
    feature.sub_features = feature.sub_features.map(sub_feature => JSON.parse(JSON.stringify(Object.assign(Object.assign({}, sub_feature), { reqs: null }))));
    return feature;
});
exports.getFeature = getFeature;
const createFeature = (data, projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    yield validation_1.default.createFeature(data);
    const features = yield features_model_1.default.find({ project: projectId });
    if (!features)
        (0, throwError_1.default)(`Features with the project _id ${projectId} not be found`);
    const feature = yield features_model_1.default.create(Object.assign(Object.assign({}, data), { sort: features.length + 1 }));
    return feature;
});
exports.createFeature = createFeature;
const updateFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const updatedFeature = yield features_model_1.default.findByIdAndUpdate(featureId, data, { new: true });
    if (!updatedFeature)
        return (0, throwError_1.default)(`Feature to update not found`);
    const feature = yield features_model_1.default.findById(updatedFeature._id);
    return feature;
});
exports.updateFeature = updateFeature;
const deleteFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const deletedFeature = yield (0, delete_1.cascadeDeleteFeature)(featureId);
    return deletedFeature;
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const feature = yield features_model_1.default.findById(featureId).populate('sub_features');
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    const subFeature = yield features_model_1.default.create(Object.assign(Object.assign({}, data), { project: feature.project, sort: feature.sub_features.length, main_feature: featureId }));
    return subFeature;
});
exports.createSubFeature = createSubFeature;
const sortFeatures = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    data;
    yield validation_1.default.sort(data);
    yield (0, access_1.checkFeatureAccess)(data[0]._id, userId);
    const result = [];
    for (const feature of data) {
        const { _id, sort } = feature;
        const updatedFeature = yield features_model_1.default.findByIdAndUpdate(_id, { sort }, { new: true });
        result.push(updatedFeature);
    }
    return { data };
});
exports.sortFeatures = sortFeatures;
