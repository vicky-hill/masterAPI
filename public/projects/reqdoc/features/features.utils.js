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
exports.getFeaturesByProjectId = exports.updateProjectFeaturesCache = exports.invalidateFeatureCache = exports.invalidateProjectFeaturesCache = void 0;
const features_model_1 = __importDefault(require("./features.model"));
const redis_1 = require("../../../utils/redis");
const invalidateProjectFeaturesCache = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `features:project:${projectId}`;
    yield (0, redis_1.deleteValue)(cacheKey);
});
exports.invalidateProjectFeaturesCache = invalidateProjectFeaturesCache;
const invalidateFeatureCache = (featureId) => __awaiter(void 0, void 0, void 0, function* () {
    const cacheKey = `feature:${featureId}`;
    console.log('cacheKey invalidate', cacheKey);
    yield (0, redis_1.deleteValue)(cacheKey);
});
exports.invalidateFeatureCache = invalidateFeatureCache;
const updateProjectFeaturesCache = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.invalidateProjectFeaturesCache)(projectId);
    const features = yield (0, exports.getFeaturesByProjectId)(projectId);
    return features;
});
exports.updateProjectFeaturesCache = updateProjectFeaturesCache;
const getFeaturesByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // const cacheKey = `features:project:${projectId}`
    // const cachedFeatures = await getValue(cacheKey)
    // if (cachedFeatures) return JSON.parse(cachedFeatures);
    const features = yield features_model_1.default
        .find({ project: projectId, main_feature: { $exists: false }, deleted: { $exists: false } })
        .select('_id name')
        .populate({
        path: 'sub_features',
        match: { deleted: { $exists: false } },
        select: '_id name main_feature',
        options: { sort: { sort: 1 } }
    })
        .sort({ sort: 1 });
    // await setValue(cacheKey, JSON.stringify(features));
    return features;
});
exports.getFeaturesByProjectId = getFeaturesByProjectId;
