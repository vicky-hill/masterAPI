"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.sortFeatures = exports.createSubFeature = exports.deleteFeature = exports.updateFeature = exports.createFeature = exports.getFeature = exports.getProjectFeatures = void 0;
const Feature = __importStar(require("./features.functions"));
const getProjectFeatures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectKey } = req.params;
        const features = yield Feature.getProjectFeatures(projectKey);
        res.json(features);
    }
    catch (err) {
        next(err);
    }
});
exports.getProjectFeatures = getProjectFeatures;
const getFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;
        const feature = yield Feature.getFeature(featureId, userId);
        res.json(feature);
    }
    catch (err) {
        next(err);
    }
});
exports.getFeature = getFeature;
const createFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const feature = yield Feature.createFeature(req.body, userId);
        res.json(feature);
    }
    catch (err) {
        next(err);
    }
});
exports.createFeature = createFeature;
const updateFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;
        const feature = yield Feature.updateFeature(req.body, featureId, userId);
        res.json(feature);
    }
    catch (err) {
        next(err);
    }
});
exports.updateFeature = updateFeature;
const deleteFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;
        const deletedFeature = yield Feature.deleteFeature(featureId, userId);
        res.json(deletedFeature);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteFeature = deleteFeature;
const createSubFeature = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;
        const subFeature = yield Feature.createSubFeature(req.body, featureId, userId);
        res.json(subFeature);
    }
    catch (err) {
        next(err);
    }
});
exports.createSubFeature = createSubFeature;
const sortFeatures = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const data = yield Feature.sortFeatures(req.body, userId);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.sortFeatures = sortFeatures;
