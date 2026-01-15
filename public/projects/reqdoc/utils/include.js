"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderReqs = exports.orderSubFeatures = exports.includeTeam = exports.includeReqs = exports.includeFeatures = exports.includeMainFeature = exports.includeSubFeatures = exports.includeProjects = exports.projectAttributes = exports.reqAttributes = exports.mainFeatureAttributes = exports.subFeatureAttributes = exports.featureAttributes = void 0;
const models_1 = require("../models");
exports.featureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
exports.subFeatureAttributes = ['featureId', 'projectId', 'parentId', 'name'];
exports.mainFeatureAttributes = ['featureId', 'projectId', 'name'];
exports.reqAttributes = ['reqId', 'projectId', 'featureId', 'key', 'title', 'text', 'details', 'status'];
exports.projectAttributes = ['projectId', 'name', 'projectKey', 'key'];
exports.includeProjects = {
    model: models_1.Project,
    as: 'projects',
    required: false,
    attributes: exports.projectAttributes
};
exports.includeSubFeatures = {
    model: models_1.Feature,
    as: 'subFeatures',
    required: false,
    attributes: exports.subFeatureAttributes
};
exports.includeMainFeature = {
    model: models_1.Feature,
    as: 'mainFeature',
    attributes: exports.mainFeatureAttributes
};
exports.includeFeatures = {
    model: models_1.Feature,
    required: false,
    attributes: exports.featureAttributes,
    include: [exports.includeSubFeatures]
};
exports.includeReqs = {
    model: models_1.Req,
    as: 'reqs',
    required: false,
    where: { changedReq: null },
    attributes: exports.reqAttributes
};
exports.includeTeam = {
    model: models_1.Team,
    as: 'team'
};
exports.orderSubFeatures = [{ model: models_1.Feature, as: 'subFeatures' }, 'sort', 'ASC'];
exports.orderReqs = [{ model: models_1.Req, as: 'reqs' }, 'sort', 'ASC'];
