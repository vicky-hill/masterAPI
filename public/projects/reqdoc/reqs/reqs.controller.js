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
exports.searchReqs = exports.sortReqs = exports.changeReq = exports.deleteReq = exports.updateReq = exports.createReq = exports.getReqByKey = exports.getReqById = exports.getReqsByFeatureId = void 0;
const Req = __importStar(require("./reqs.functions"));
const getReqsByFeatureId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { featureId } = req.params;
        const { userId } = req.user;
        const reqs = yield Req.getReqsByFeatureId(featureId, userId);
        res.json(reqs);
    }
    catch (err) {
        next(err);
    }
});
exports.getReqsByFeatureId = getReqsByFeatureId;
const getReqById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;
        const requirement = yield Req.getReqById(reqId, userId);
        res.json(requirement);
    }
    catch (err) {
        next(err);
    }
});
exports.getReqById = getReqById;
const getReqByKey = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectKey, reqKey } = req.params;
        const { userId } = req.user;
        const requirement = yield Req.getReqByKey(projectKey, reqKey, userId);
        res.json(requirement);
    }
    catch (err) {
        next(err);
    }
});
exports.getReqByKey = getReqByKey;
const createReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const requirement = yield Req.createReq(req.body, userId);
        res.json(requirement);
    }
    catch (err) {
        next(err);
    }
});
exports.createReq = createReq;
const updateReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;
        const requirement = yield Req.updateReq(req.body, reqId, userId);
        res.json(requirement);
    }
    catch (err) {
        next(err);
    }
});
exports.updateReq = updateReq;
const deleteReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;
        const requirement = yield Req.deleteReq(reqId, userId);
        res.json(requirement);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteReq = deleteReq;
const changeReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const { userId } = req.user;
        const result = yield Req.changeReq(req.body, reqId, userId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.changeReq = changeReq;
const sortReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Req.sortReqs(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.sortReqs = sortReqs;
const searchReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term } = req.query;
        const { projectId } = req.params;
        const { userId } = req.user;
        const result = yield Req.searchReqs(projectId, term, userId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.searchReqs = searchReqs;
