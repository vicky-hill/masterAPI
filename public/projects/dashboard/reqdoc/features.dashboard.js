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
exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeature = exports.getFeatures = void 0;
const features_model_1 = __importDefault(require("../../reqdoc/features/features.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getFeatures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const features = yield features_model_1.default.find();
        res.json(features);
    }
    catch (err) {
        err.ctrl = exports.getFeatures;
        next(err);
    }
});
exports.getFeatures = getFeatures;
const getFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const feature = yield features_model_1.default.findById(featureId);
        if (!feature)
            return (0, throwError_1.default)('Feature not found');
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
        const feature = yield features_model_1.default.create(req.body);
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
        const { featureId } = req.params;
        const updatedFeature = yield features_model_1.default.findByIdAndUpdate(featureId, req.body, { new: true });
        res.json(updatedFeature);
    }
    catch (err) {
        err.ctrl = exports.updateFeature;
        next(err);
    }
});
exports.updateFeature = updateFeature;
const deleteFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const feature = yield features_model_1.default.findByIdAndDelete(featureId);
        res.json(feature);
    }
    catch (err) {
        err.ctrl = exports.deleteFeature;
        next(err);
    }
});
exports.deleteFeature = deleteFeature;
