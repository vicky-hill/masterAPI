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
exports.sortFeatures = exports.createSubFeature = exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeature = exports.getProjectFeatures = void 0;
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const redis_1 = require("../../../utils/redis");
const models_1 = require("../models");
const access_1 = require("../utils/access");
const include_1 = require("../utils/include");
const features_utils_1 = require("./features.utils");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const getProjectFeatures = (projectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const features = yield (0, features_utils_1.getFeatureByProjectKey)(projectKey);
    return features;
});
exports.getProjectFeatures = getProjectFeatures;
const getFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const cacheKey = `feature:${featureId}`;
    const cachedFeature = yield (0, redis_1.getValue)(cacheKey);
    if (cachedFeature)
        return cachedFeature;
    const feature = yield models_1.FeatureModel.findByPk(featureId, {
        attributes: include_1.featureAttributes,
        include: [
            include_1.includeSubFeatures,
            include_1.includeMainFeature,
            include_1.includeReqs
        ],
        order: [
            include_1.orderSubFeatures,
            include_1.orderReqs
        ]
    });
    if (!feature)
        return (0, throwError_1.default)('Feature not found');
    if (feature.deleted)
        return (0, throwError_1.default)('Feature was deleted');
    yield (0, redis_1.setValue)(cacheKey, feature);
    return feature;
});
exports.getFeature = getFeature;
const createFeature = (_a, userId_1) => __awaiter(void 0, [_a, userId_1], void 0, function* ({ name, projectId }, userId) {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    yield validation_1.default.createFeature({ name, projectId });
    const features = yield (0, features_utils_1.getFeaturesByProjectId)(projectId);
    const feature = yield models_1.FeatureModel.create({
        projectId: Number(projectId),
        name: name,
        sort: features.length + 1
    });
    yield (0, redis_1.updateValue)(`features:project:${projectId}`, [...features, feature]);
    return [...features, feature];
});
exports.createFeature = createFeature;
const updateFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const feature = yield models_1.FeatureModel.findByPk(featureId);
    if (!feature)
        throw new Error('Feature not found');
    yield feature.update(data);
    const features = yield (0, features_utils_1.updateProjectFeaturesCache)(feature.projectId.toString());
    yield (0, features_utils_1.invalidateFeatureCache)(feature.featureId.toString());
    return features;
});
exports.updateFeature = updateFeature;
const deleteFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    const deletedFeature = yield (0, delete_1.cascadeDeleteFeature)(featureId);
    const features = yield (0, features_utils_1.updateProjectFeaturesCache)(deletedFeature.projectId.toString());
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return features;
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    yield validation_1.default.updateFeature(data);
    const mainFeature = yield models_1.FeatureModel.findByPk(featureId, {
        include: [include_1.includeSubFeatures]
    });
    if (!mainFeature)
        return (0, throwError_1.default)('Feature not found');
    const projectId = mainFeature.projectId.toString();
    const subFeature = yield models_1.FeatureModel.create(Object.assign(Object.assign({}, data), { projectId: Number(projectId), parentId: Number(featureId), sort: ((_a = mainFeature.subFeatures) === null || _a === void 0 ? void 0 : _a.length) || 0 }));
    const features = yield (0, features_utils_1.getFeaturesByProjectId)(projectId);
    yield (0, redis_1.updateValue)(`features:project:${projectId}`, features);
    yield (0, features_utils_1.invalidateFeatureCache)(featureId);
    return features;
});
exports.createSubFeature = createSubFeature;
const sortFeatures = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.sort(data);
    const featureId = data[0].featureId;
    const feature = yield models_1.FeatureModel.findByPk(featureId);
    if (!feature)
        throw new Error('Feature not found');
    yield (0, access_1.checkFeatureAccess)(featureId, userId);
    ``;
    yield Promise.all(data.map(({ featureId, sort }) => {
        models_1.FeatureModel.update({ sort }, { where: { featureId } });
    }));
    yield (0, features_utils_1.invalidateProjectFeaturesCache)(feature.projectId.toString());
    return 'sorted';
});
exports.sortFeatures = sortFeatures;
