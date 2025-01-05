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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const users_model_1 = __importDefault(require("../../reqdoc/users/users.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_model_1.default.find();
        res.json(users);
    }
    catch (err) {
        err.ctrl = exports.getUsers;
        next(err);
    }
});
exports.getUsers = getUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield users_model_1.default.findById(userId);
        if (!user)
            return (0, throwError_1.default)('User not found');
        res.json(user);
    }
    catch (err) {
        err.ctrl = exports.getUser;
        next(err);
    }
});
exports.getUser = getUser;
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const user = yield users_model_1.default.create(req.body);
        res.json(user);
    }
    catch (err) {
        err.ctrl = exports.createUser;
        next(err);
    }
});
exports.createUser = createUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { userId } = req.params;
        const updatedUser = yield users_model_1.default.findByIdAndUpdate(userId, req.body, { new: true });
        res.json(updatedUser);
    }
    catch (err) {
        err.ctrl = exports.updateUser;
        next(err);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const user = yield users_model_1.default.findByIdAndDelete(userId);
        res.json(user);
    }
    catch (err) {
        err.ctrl = exports.deleteUser;
        next(err);
    }
});
exports.deleteUser = deleteUser;
