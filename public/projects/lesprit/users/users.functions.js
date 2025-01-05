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
exports.getUser = exports.createUser = void 0;
const users_model_1 = __importDefault(require("./users.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield users_model_1.default.create(data);
    const user = yield users_model_1.default.findById(newUser._id);
    return user;
});
exports.createUser = createUser;
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.findById(userId);
    if (!user)
        return (0, throwError_1.default)('User not found');
    return user;
});
exports.getUser = getUser;
