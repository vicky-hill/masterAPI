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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturesByProjectId = exports.getFeatureByProjectKey = exports.updateProjectFeaturesCache = exports.invalidateFeatureCache = exports.invalidateProjectFeaturesCache = void 0;
const include_1 = require("../utils/include");
const models_1 = require("../models");
const invalidateProjectFeaturesCache = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    // const cacheKey = `features:project:${projectId}`
    // await deleteValue(cacheKey)
});
exports.invalidateProjectFeaturesCache = invalidateProjectFeaturesCache;
const invalidateFeatureCache = (featureId) => __awaiter(void 0, void 0, void 0, function* () {
    // const cacheKey = `feature:${featureId}`
    // await deleteValue(cacheKey)
});
exports.invalidateFeatureCache = invalidateFeatureCache;
const updateProjectFeaturesCache = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.invalidateProjectFeaturesCache)(projectId);
    // const features: Feature[] = await getFeaturesByProjectId(projectId);
    // return features;
});
exports.updateProjectFeaturesCache = updateProjectFeaturesCache;
const getFeatureByProjectKey = (projectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.ProjectModel.findOne({
        where: { projectKey }
    });
    if (!project)
        throw new Error('Project not found');
    // const features: Feature[] = await getFeaturesByProjectId(project.getDataValue('projectId').toString());
    // return features;
});
exports.getFeatureByProjectKey = getFeatureByProjectKey;
const getFeaturesByProjectId = (projectId) => __awaiter(void 0, void 0, void 0, function* () {
    //     const cacheKey = `features:project:${projectId}`
    // 
    //     const cachedFeatures = await getValue(cacheKey)
    //     if (cachedFeatures) return JSON.parse(cachedFeatures);
    const features = yield models_1.FeatureModel.findAll({
        where: { projectId },
        attributes: include_1.featureAttributes,
        include: [
            include_1.includeSubFeatures
        ]
    });
    // await setValue(cacheKey, JSON.stringify(features));
    return features;
});
exports.getFeaturesByProjectId = getFeaturesByProjectId;
