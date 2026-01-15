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
exports.sortFeatures = exports.createSubFeature = exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeatureById = exports.getProjectFeatures = void 0;
const models_1 = require("../models");
const include_1 = require("../utils/include");
const validation_1 = __importDefault(require("../utils/validation"));
const sequelize_1 = require("sequelize");
const getProjectFeatures = (projectKey, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findOne({
        rejectOnEmpty: new Error('No project found'),
        where: { projectKey },
        include: [{
                model: models_1.Team,
                include: [{
                        model: models_1.UserModel,
                        where: { userId }
                    }, {
                        model: models_1.Feature,
                        where: { parentId: { [sequelize_1.Op.ne]: null } },
                        required: false,
                        include: [include_1.includeSubFeatures]
                    }]
            }]
    });
    return project.features;
});
exports.getProjectFeatures = getProjectFeatures;
const getFeatureById = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const cached = yield models_1.Feature.getCache(featureId, userId);
    if (cached)
        return cached;
    const feature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
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
    yield feature.setCache(feature);
    return feature;
});
exports.getFeatureById = getFeatureById;
const createFeature = (_a, userId_1) => __awaiter(void 0, [_a, userId_1], void 0, function* ({ name, projectId }, userId) {
    yield validation_1.default.createFeature({ name, projectId });
    yield models_1.Project.checkAccess(projectId, userId);
    const featureCount = yield models_1.Feature.count({
        where: { projectId, parentId: null }
    });
    yield models_1.Feature.create({
        projectId: Number(projectId),
        name: name,
        sort: featureCount + 1
    }, {
        fields: ['name', 'projectId']
    });
    const features = yield models_1.Feature.getFeaturesByProjectId(projectId);
    return features;
});
exports.createFeature = createFeature;
const updateFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.updateFeature(data);
    const feature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });
    yield feature.checkAccess(userId);
    yield feature.update(data, { fields: ['name'] });
    yield feature.clearCache();
    const features = yield models_1.Feature.getFeaturesByProjectId(feature.projectId);
    return features;
});
exports.updateFeature = updateFeature;
const deleteFeature = (featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const feature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });
    yield feature.checkAccess(userId);
    yield feature.destroy();
    const features = yield models_1.Feature.getFeaturesByProjectId(feature.projectId);
    return features;
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (data, featureId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    yield validation_1.default.updateFeature(data);
    const mainFeature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found'),
        include: [include_1.includeSubFeatures]
    });
    yield mainFeature.checkAccess(userId);
    const projectId = mainFeature.projectId;
    yield models_1.Feature.create(Object.assign(Object.assign({}, data), { projectId: Number(projectId), parentId: Number(featureId), sort: ((_a = mainFeature.subFeatures) === null || _a === void 0 ? void 0 : _a.length) || 0 }));
    const features = yield models_1.Feature.getFeaturesByProjectId(projectId);
    return features;
});
exports.createSubFeature = createSubFeature;
const sortFeatures = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.sort(data);
    const featureId = data[0].featureId;
    const feature = yield models_1.Feature.findByPk(featureId, {
        rejectOnEmpty: new Error('Feature not found')
    });
    yield feature.checkAccess(userId);
    yield Promise.all(data.map(({ featureId, sort }) => {
        models_1.Feature.update({ sort }, { where: { featureId } });
    }));
    return 'sorted';
});
exports.sortFeatures = sortFeatures;
