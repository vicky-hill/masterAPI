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
exports.deleteTeam = exports.updateTeam = exports.createTeam = exports.getTeam = exports.getTeams = void 0;
const teams_model_1 = __importDefault(require("../../reqdoc/teams/teams.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
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
const getTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const team = yield teams_model_1.default.findById(teamId);
        if (!team)
            return (0, throwError_1.default)('Team not found');
        res.json(team);
    }
    catch (err) {
        err.ctrl = exports.getTeam;
        next(err);
    }
});
exports.getTeam = getTeam;
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const team = yield teams_model_1.default.create(req.body);
        res.json(team);
    }
    catch (err) {
        err.ctrl = exports.createTeam;
        next(err);
    }
});
exports.createTeam = createTeam;
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { teamId } = req.params;
        const updatedTeam = yield teams_model_1.default.findByIdAndUpdate(teamId, req.body, { new: true });
        res.json(updatedTeam);
    }
    catch (err) {
        err.ctrl = exports.updateTeam;
        next(err);
    }
});
exports.updateTeam = updateTeam;
const deleteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const team = yield teams_model_1.default.findByIdAndDelete(teamId);
        res.json(team);
    }
    catch (err) {
        err.ctrl = exports.deleteTeam;
        next(err);
    }
});
exports.deleteTeam = deleteTeam;
