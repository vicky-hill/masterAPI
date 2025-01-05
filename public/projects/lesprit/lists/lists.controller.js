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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUserLists = exports.deleteList = exports.updateList = exports.getList = exports.getLists = exports.createList = void 0;
const List = __importStar(require("./lists.functions"));
const createList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const list = yield List.createList(req.body, userId);
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
exports.createList = createList;
const getLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const lists = yield List.getLists(userId);
        res.json(lists);
    }
    catch (err) {
        next(err);
    }
});
exports.getLists = getLists;
const getList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        const list = yield List.getList(listId);
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
exports.getList = getList;
const updateList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        const review = yield List.updateList(req.body, listId);
        res.json(review);
    }
    catch (err) {
        next(err);
    }
});
exports.updateList = updateList;
const deleteList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        const list = yield List.deleteList(listId);
        res.json(list);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteList = deleteList;
const deleteUserLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const deleted = yield List.deleteUserLists(userId);
        res.json({ deleted });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteUserLists = deleteUserLists;
