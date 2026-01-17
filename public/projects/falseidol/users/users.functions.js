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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const models_1 = require("../utils/models");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const userInstances = yield models_1.User.findAll({
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
    const user = yield models_1.User.findOne({
        rejectOnEmpty: new Error('User not found'),
        where: { userId }
    });
    return user;
});
exports.getUser = getUser;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.create(data);
    return user;
});
exports.createUser = createUser;
const updateUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({
        rejectOnEmpty: new Error('User not found'),
        where: { userId }
    });
    yield user.update(data);
    return user;
});
exports.updateUser = updateUser;
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield models_1.User.destroy({ where: { userId } });
    return { userId };
});
exports.deleteUser = deleteUser;
const loginUser = (userId, req) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = { token: JSON.stringify({ falseidol: userId }) };
    const user = yield (0, exports.getUser)(userId);
    return user;
});
exports.loginUser = loginUser;
