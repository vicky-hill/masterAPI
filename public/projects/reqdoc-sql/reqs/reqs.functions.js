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
const reqs_model_1 = __importDefault(require("./reqs.model"));
const getReqs = () => __awaiter(void 0, void 0, void 0, function* () {
    const reqInstances = yield reqs_model_1.default.findAll({
        where: {}
    });
    const reqs = reqInstances.map((reqInstance) => {
        const req = reqInstance.get({ plain: true });
        return Object.assign({}, req);
    });
    return reqs;
});
exports.getReqs = getReqs;
const getReq = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const reqInstance = yield reqs_model_1.default.findOne({
        where: { reqId }
    });
    if (!reqInstance)
        throw new Error('Req not found');
    const req = reqInstance.get({ plain: true });
    return req;
});
exports.getReq = getReq;
const createReq = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield reqs_model_1.default.create(data);
    return req;
});
exports.createReq = createReq;
const updateReq = (data, reqId) => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield reqs_model_1.default.update(data, { where: { reqId } });
    if (!req)
        throw new Error('Req not found');
    return req;
});
exports.updateReq = updateReq;
const deleteReq = (reqId) => __awaiter(void 0, void 0, void 0, function* () {
    yield reqs_model_1.default.destroy({ where: { reqId } });
    return { reqId };
});
exports.deleteReq = deleteReq;
