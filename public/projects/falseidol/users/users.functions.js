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
const users_model_1 = __importDefault(require("./users.model"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInstances = yield users_model_1.default.findAll({
        where: {}
    });
    const users = userInstances.map((userInstance) => {
        const user = userInstance.get({ plain: true });
        return Object.assign({}, user);
    });
    return users;
});
exports.getUsers = getUsers;
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userInstance = yield users_model_1.default.findOne({
        where: { userId }
    });
    if (!userInstance)
        throw new Error('User not found');
    const user = userInstance.get({ plain: true });
    return user;
});
exports.getUser = getUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_model_1.default.create(data);
    return user;
});
exports.createUser = createUser;
const updateUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.default.update(data, { where: { userId } });
    const user = yield users_model_1.default.findByPk(userId);
    if (!user)
        throw new Error('User not found');
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield users_model_1.default.destroy({ where: { userId } });
    return { userId };
});
exports.deleteUser = deleteUser;
