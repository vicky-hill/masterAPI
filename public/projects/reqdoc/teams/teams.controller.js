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
const users_model_1 = __importDefault(require("../users/users.model"));
const validation_1 = __importDefault(require("../utils/validation"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        yield validation_1.default.createTeam(req.body);
        const team = yield teams_model_1.default.create({ name: req.body.name });
        const updatedTeam = yield teams_model_1.default.findByIdAndUpdate(team._id, {
            $push: {
                users: {
                    user: req.body.user,
                    role: 'user'
                }
            }
        }, { new: true });
        res.json(updatedTeam);
    }
    catch (err) {
        err.ctrl = exports.createTeam;
        next(err);
    }
});
exports.createTeam = createTeam;
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield teams_model_1.default.find();
        res.json(teams);
    }
    catch (err) {
        err.ctrl = exports.getTeams;
        next(err);
    }
});
exports.getTeams = getTeams;
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { teamID } = req.params;
        const team = yield teams_model_1.default.findByIdAndUpdate(teamID, req.body, { new: true })
            .populate({
            path: 'users.user',
            select: 'email',
        });
        if (!team)
            return (0, throwError_1.default)('Team not found');
        res.json(team);
    }
    catch (err) {
        err.ctrl = exports.updateTeam;
        next(err);
    }
});
exports.updateTeam = updateTeam;
const getUserTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamID } = req.params;
        const team = yield teams_model_1.default.findByIdAndUpdate(teamID, req.body, { new: true })
            .populate({
            path: 'users.user',
            select: 'email',
        });
        if (!team)
            return (0, throwError_1.default)('Team not found');
        res.json(team);
    }
    catch (err) {
        err.ctrl = exports.getUserTeam;
        next(err);
    }
});
exports.getUserTeam = getUserTeam;
const getUserTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.user;
        const teams = yield teams_model_1.default.find({ 'users.user': userID }).populate({
            path: 'users.user',
            select: 'email',
        });
        res.json({ data: teams });
    }
    catch (err) {
        err.ctrl = exports.getUserTeams;
        next(err);
    }
});
exports.getUserTeams = getUserTeams;
const switchUserTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamID } = req.params;
        const { userID } = req.user;
        const team = yield teams_model_1.default.findById(teamID).populate({
            path: 'users.user',
            select: 'email',
        });
        if (!team)
            return (0, throwError_1.default)('Team not found');
        const teamUser = team.users.find(user => user.user._id.toString() === userID.toString());
        if (!teamUser)
            return (0, throwError_1.default)('Team user not found');
        const user = yield users_model_1.default.findByIdAndUpdate(userID, { role: teamUser.role, team: team._id }, { new: true });
        res.json(user);
    }
    catch (err) {
        err.ctrl = exports.switchUserTeam;
        next(err);
    }
});
exports.switchUserTeam = switchUserTeam;
