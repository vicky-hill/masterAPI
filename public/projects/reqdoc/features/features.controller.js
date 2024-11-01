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
const access_1 = require("../utils/access");
const populate_1 = require("../utils/populate");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const getFeatures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const features = yield features_model_1.default
            .find({ project: projectID, deleted: { $exists: false } })
            .sort({ sort: 1 });
        res.json({ data: features });
    }
    catch (err) {
        err.ctrl = exports.getFeatures;
        next(err);
    }
});
exports.getFeatures = getFeatures;
const getFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        const feature = yield features_model_1.default
            .findById(featureID)
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
        res.json(feature);
    }
    catch (err) {
        err.ctrl = exports.getFeature;
        next(err);
    }
});
exports.getFeature = getFeature;
const createFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const projectID = req.body.project;
        const userID = req.user._id;
        yield (0, access_1.checkProjectAccess)(projectID, userID);
        yield validation_1.default.createFeature(req.body);
        const features = yield features_model_1.default.find({ project: req.body.project });
        if (!features)
            (0, throwError_1.default)(`Features with the project _id ${projectID} not be found`);
        const feature = yield features_model_1.default.create(Object.assign(Object.assign({}, req.body), { sort: features.length + 1 }));
        res.json(feature);
    }
    catch (err) {
        err.ctrl = exports.createFeature;
        next(err);
    }
});
exports.createFeature = createFeature;
const updateFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { featureID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        yield validation_1.default.updateFeature(req.body);
        const updatedFeature = yield features_model_1.default.findByIdAndUpdate(featureID, req.body, { new: true });
        if (!updatedFeature)
            return (0, throwError_1.default)(`Feature to update not found`);
        const feature = yield features_model_1.default.findById(updatedFeature._id);
        res.status(200).json(feature);
    }
    catch (err) {
        err.ctrl = exports.updateFeature;
        next(err);
    }
});
exports.updateFeature = updateFeature;
const deleteFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        const deletedFeature = yield (0, delete_1.cascadeDeleteFeature)(featureID);
        res.json(deletedFeature);
    }
    catch (err) {
        err.ctrl = exports.deleteFeature;
        next(err);
    }
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { featureID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(featureID, userID);
        yield validation_1.default.updateFeature(req.body);
        const feature = yield features_model_1.default.findById(featureID).populate('sub_features');
        if (!feature)
            return (0, throwError_1.default)('Feature not found');
        const subFeature = yield features_model_1.default.create(Object.assign(Object.assign({}, req.body), { project: feature.project, sort: feature.sub_features.length, main_feature: featureID }));
        res.json(subFeature);
    }
    catch (err) {
        err.ctrl = exports.createSubFeature;
        next(err);
    }
});
exports.createSubFeature = createSubFeature;
const sortFeatures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        yield validation_1.default.sort(req.body);
        const { userID } = req.user;
        yield (0, access_1.checkFeatureAccess)(req.body[0]._id, userID);
        const data = [];
        for (const feature of req.body) {
            const { _id, sort } = feature;
            const updatedFeature = yield features_model_1.default.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedFeature);
        }
        res.json({ data });
    }
    catch (err) {
        err.ctrl = exports.sortFeatures;
        next(err);
    }
});
exports.sortFeatures = sortFeatures;
