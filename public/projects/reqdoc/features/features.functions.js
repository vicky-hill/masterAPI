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
const redis_1 = require("../../../utils/redis");
const features_utils_1 = require("./features.utils");
const projects_model_1 = __importDefault(require("../projects/projects.model"));
const getFeatures = (projectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield projects_model_1.default.findOne({ slug: projectKey });
    if (!project)
        throw new Error('Project not found');
    const features = yield (0, features_utils_1.getFeaturesByProjectId)(project._id);
    return features;
});
exports.getFeatures = getFeatures;
const getFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const cacheKey = `feature:${featureId}`;
    console.log('cacheKey get', cacheKey);
    const cachedFeature = yield (0, redis_1.getValue)(cacheKey);
    if (cachedFeature)
        return cachedFeature;
    const feature = yield features_model_1.default
        .findById(featureId)
        .populate([
        Object.assign(Object.assign({}, populate_1.reqs), { options: { sort: { sort: 'asc' } } }),
        {
            path: 'sub_features',
            options: { sort: { sort: 'asc' } },
            populate: Object.assign(Object.assign({}, populate_1.reqs), { options: { sort: { sort: 'asc' } } })
        },
        {
            path: 'main_feature',
            select: 'name'
        }
    ]);
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    yield (0, redis_1.setValue)(cacheKey, feature);
    return feature;
});
exports.getFeature = getFeature;
const createFeature = (data, projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    yield validation_1.default.createFeature(data);
    const features = yield (0, features_utils_1.getFeaturesByProjectId)(projectId);
    const feature = yield features_model_1.default.create(Object.assign(Object.assign({}, data), { sort: features.length + 1, sub_features: [] }));
    yield (0, redis_1.updateValue)(`features:project:${projectId}`, [...features, feature]);
    return [...features, feature];
});
exports.createFeature = createFeature;
const updateFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const updatedFeature = yield features_model_1.default.findByIdAndUpdate(featureId, data, { new: true });
    if (!updatedFeature)
        return (0, throwError_1.default)(`Feature to update not found`);
    const features = yield (0, features_utils_1.updateProjectFeaturesCache)(updatedFeature.project.toString());
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return features;
});
exports.updateFeature = updateFeature;
const deleteFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const deletedFeature = yield (0, delete_1.cascadeDeleteFeature)(featureId);
    const features = yield (0, features_utils_1.updateProjectFeaturesCache)(deletedFeature.project.toString());
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return features;
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const mainFeature = yield features_model_1.default.findById(featureId).populate('sub_features');
    if (!mainFeature)
        return (0, throwError_1.default)('Feature not found');
    const projectId = mainFeature.project.toString();
    const subFeature = yield features_model_1.default.create(Object.assign(Object.assign({}, data), { project: projectId, sort: mainFeature.sub_features.length, main_feature: featureId }));
    const features = yield (0, features_utils_1.getFeaturesByProjectId)(projectId);
    const updatedFeatures = features.map(feature => (feature._id === mainFeature._id.toString()
        ? Object.assign(Object.assign({}, feature), { sub_features: [...feature.sub_features, subFeature.toObject()] }) : feature));
    yield (0, redis_1.updateValue)(`features:project:${projectId}`, updatedFeatures);
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return updatedFeatures;
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
    yield (0, features_utils_1.invalidateProjectFeaturesCache)(result[0].project.toString());
    return { data };
});
exports.sortFeatures = sortFeatures;
