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
exports.switchUserTeam = exports.getUserTeams = exports.getUserTeam = exports.updateTeam = exports.getTeams = exports.createTeam = void 0;
const teams_model_1 = __importDefault(require("./teams.model"));
const validation_1 = __importDefault(require("../utils/validation"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const users_model_1 = __importDefault(require("../users/users.model"));
const createTeam = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createTeam(data);
    const team = yield teams_model_1.default.create({ name: data.name });
    const updatedTeam = yield teams_model_1.default.findByIdAndUpdate(team._id, {
        $push: {
            users: {
                user: data.user,
                role: 'user'
            }
        }
    }, { new: true });
    return updatedTeam;
});
exports.createTeam = createTeam;
const getTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield teams_model_1.default.find();
    return teams;
});
exports.getTeams = getTeams;
const updateTeam = (data, teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teams_model_1.default.findByIdAndUpdate(teamId, data, { new: true })
        .populate({
        path: 'users.user',
        select: 'email',
    });
    if (!team)
        return (0, throwError_1.default)('Team not found');
    return team;
});
exports.updateTeam = updateTeam;
const getUserTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teams_model_1.default.findById(teamId)
        .populate({
        path: 'users.user',
        select: 'email',
    });
    if (!team)
        return (0, throwError_1.default)('Team not found');
    return team;
});
exports.getUserTeam = getUserTeam;
const getUserTeams = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield teams_model_1.default.find({ 'users.user': userId }).populate({
        path: 'users.user',
        select: 'email',
    });
    return { data: teams };
});
exports.getUserTeams = getUserTeams;
const switchUserTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield teams_model_1.default.findById(teamId).populate({
        path: 'users.user',
        select: 'email',
    });
    if (!team)
        return (0, throwError_1.default)('Team not found');
    const teamUser = team.users.find(user => user.user._id.toString() === userId);
    if (!teamUser)
        return (0, throwError_1.default)('Team user not found');
    const user = yield users_model_1.default.findByIdAndUpdate(userId, { role: teamUser.role, team: team._id }, { new: true });
    return user;
});
exports.switchUserTeam = switchUserTeam;
