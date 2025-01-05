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
exports.deleteReq = exports.updateReq = exports.createReq = exports.getReq = exports.getReqs = void 0;
const reqs_model_1 = __importDefault(require("../../reqdoc/reqs/reqs.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getReqs = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqs = yield reqs_model_1.default.find();
        res.json(reqs);
    }
    catch (err) {
        err.ctrl = exports.getReqs;
        next(err);
    }
});
exports.getReqs = getReqs;
const getReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const requirement = yield reqs_model_1.default.findById(reqId);
        if (!requirement)
            return (0, throwError_1.default)('Req not found');
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.getReq;
        next(err);
    }
});
exports.getReq = getReq;
const createReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const requirement = yield reqs_model_1.default.create(req.body);
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.createReq;
        next(err);
    }
});
exports.createReq = createReq;
const updateReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { reqId } = req.params;
        const updatedReq = yield reqs_model_1.default.findByIdAndUpdate(reqId, req.body, { new: true });
        res.json(updatedReq);
    }
    catch (err) {
        err.ctrl = exports.updateReq;
        next(err);
    }
});
exports.updateReq = updateReq;
const deleteReq = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { reqId } = req.params;
        const requirement = yield reqs_model_1.default.findByIdAndDelete(reqId);
        res.json(requirement);
    }
    catch (err) {
        err.ctrl = exports.deleteReq;
        next(err);
    }
});
exports.deleteReq = deleteReq;
