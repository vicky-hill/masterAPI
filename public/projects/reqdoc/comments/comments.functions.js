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
exports.deleteComment = exports.editComment = exports.addComment = void 0;
const models_1 = require("../models");
const validation_1 = __importDefault(require("../utils/validation"));
const addComment = (data, reqId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.addComment(data);
    yield models_1.Req.checkAccess(reqId, userId);
    yield models_1.Comment.create(Object.assign(Object.assign({}, data), { userId, reqId: Number(reqId) }), { fields: ['text', 'reqId', 'userId'] });
    const req = yield models_1.Req.getReqById(reqId);
    return req;
});
exports.addComment = addComment;
const editComment = (data, commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.editComment(data);
    const comment = yield models_1.Comment.findByPk(commentId, {
        rejectOnEmpty: new Error('Comment not found')
    });
    yield comment.checkAccess(userId);
    yield comment.update(Object.assign(Object.assign({}, data), { edited: true }), { fields: ['text', 'edited'] });
    const req = yield models_1.Req.getReqById(comment.reqId);
    return req;
});
exports.editComment = editComment;
const deleteComment = (commentId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield models_1.Comment.findByPk(commentId, {
        rejectOnEmpty: new Error('Comment not found')
    });
    yield comment.checkAccess(userId);
    yield comment.destroy();
    const req = yield models_1.Req.getReqById(comment.reqId);
    return req;
});
exports.deleteComment = deleteComment;
