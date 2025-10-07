"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderReqs = exports.orderSubFeatures = exports.includeTeam = exports.includeReqs = exports.includeFeatures = exports.includeMainFeature = exports.includeSubFeatures = exports.reqAttributes = exports.mainFeatureAttributes = exports.subFeatureAttributes = exports.featureAttributes = void 0;
const models_1 = require("../models");
exports.featureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
exports.subFeatureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
exports.mainFeatureAttributes = ['featureId', 'projectId', 'name'];
exports.reqAttributes = ['reqId', 'projectId', 'featureId', 'key', 'title', 'text', 'details', 'status'];
exports.includeSubFeatures = {
    model: models_1.FeatureModel,
    as: 'subFeatures',
    where: { deleted: null },
    required: false,
    attributes: exports.subFeatureAttributes
};
exports.includeMainFeature = {
    model: models_1.FeatureModel,
    as: 'mainFeature',
    attributes: exports.mainFeatureAttributes
};
exports.includeFeatures = {
    model: models_1.FeatureModel,
    as: 'features',
    where: { deleted: null },
    required: false,
    attributes: exports.featureAttributes,
    include: [exports.includeSubFeatures]
};
exports.includeReqs = {
    model: models_1.ReqModel,
    as: 'reqs',
    required: false,
    where: { changedReq: null, deleted: null },
    attributes: exports.reqAttributes
};
exports.includeTeam = {
    model: models_1.TeamModel,
    as: 'team'
};
exports.orderSubFeatures = [{ model: models_1.FeatureModel, as: 'subFeatures' }, 'sort', 'ASC'];
exports.orderReqs = [{ model: models_1.ReqModel, as: 'reqs' }, 'sort', 'ASC'];
