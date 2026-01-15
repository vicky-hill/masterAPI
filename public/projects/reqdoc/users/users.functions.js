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
exports.updateUser = exports.inviteUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const models_1 = require("../models");
const validation_1 = __importDefault(require("../utils/validation"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield models_1.UserModel.findAll();
    return users;
});
exports.getUsers = getUsers;
const getUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.UserModel.getUserById(userId);
    return user;
});
exports.getUser = getUser;
const createUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createUser(data);
    const { teamId, role } = data;
    let team;
    if (teamId) {
        team = yield models_1.Team.getTeamById(teamId, userId);
    }
    else {
        team = yield models_1.Team.create({
            name: 'New Team'
        });
    }
    const { userId: newUserId } = yield models_1.UserModel.create(Object.assign(Object.assign({}, data), { teamId: teamId ? teamId : null, role: !teamId ? 'admin' : role ? role : 'user' }));
    const user = yield models_1.UserModel.getUserById(newUserId);
    yield team.addUser(user);
    return user;
});
exports.createUser = createUser;
const inviteUser = (data, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = data;
    // Todo :: Handle inviting non-existing user
    // Todo :: Check if user already in team
    // Todo :: Send email to user
    const team = yield models_1.Team.getTeamById(teamId, userId);
    const user = yield models_1.UserModel.getUserById(data.userId);
    yield team.addUser(user);
});
exports.inviteUser = inviteUser;
const updateUser = (data, userId, loggedInUserId) => __awaiter(void 0, void 0, void 0, function* () {
    // Todo :: Check access to edit (own user, user in team and role admin)
    const user = yield models_1.UserModel.getUserById(userId);
    // await user.update(data, { fields: ['role']})
    return user;
});
exports.updateUser = updateUser;
