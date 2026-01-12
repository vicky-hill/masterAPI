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
exports.removeUserFromCurrentTeam = exports.addUserToCurrentTeam = exports.getTeams = void 0;
const models_1 = require("../models");
const teams_model_1 = __importDefault(require("./teams.model"));
const getTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield teams_model_1.default.findAll({
        include: [models_1.ProjectModel]
    });
    return teams;
});
exports.getTeams = getTeams;
const addUserToCurrentTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teams_model_1.default.getTeamById(teamId);
    const user = yield models_1.UserModel.findByPk(userId, {
        rejectOnEmpty: new Error('User not found'),
    });
    if (team.users) {
        const userIds = team.users.map(user => user.userId);
        if (userIds.includes(userId)) {
            throw new Error('User is already part of this team');
        }
    }
    yield team.addUser(user);
    yield team.clearCache();
    const updatedTeam = yield teams_model_1.default.getTeamById(teamId);
    return updatedTeam;
});
exports.addUserToCurrentTeam = addUserToCurrentTeam;
const removeUserFromCurrentTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teams_model_1.default.getTeamById(teamId);
    const user = yield models_1.UserModel.findByPk(userId, {
        rejectOnEmpty: new Error('User not found'),
    });
    if (team.users) {
        const userIds = team.users.map(user => user.userId);
        if (!userIds.includes(userId)) {
            throw new Error('User is not part of this team');
        }
    }
    yield team.removeUser(user);
    yield team.clearCache();
    const updatedTeam = yield teams_model_1.default.getTeamById(teamId);
    return updatedTeam;
});
exports.removeUserFromCurrentTeam = removeUserFromCurrentTeam;
