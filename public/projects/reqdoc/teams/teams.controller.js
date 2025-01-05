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
exports.switchUserTeam = exports.getUserTeams = exports.getUserTeam = exports.updateTeam = exports.getTeams = exports.createTeam = void 0;
const Team = __importStar(require("./teams.functions"));
const createTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = yield Team.createTeam(req.body);
        res.json(team);
    }
    catch (err) {
        next(err);
    }
});
exports.createTeam = createTeam;
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield Team.getTeams();
        res.json(teams);
    }
    catch (err) {
        next(err);
    }
});
exports.getTeams = getTeams;
const updateTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const team = yield Team.updateTeam(req.body, teamId);
        res.json(team);
    }
    catch (err) {
        next(err);
    }
});
exports.updateTeam = updateTeam;
const getUserTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const team = yield Team.getUserTeam(teamId);
        res.json(team);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserTeam = getUserTeam;
const getUserTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const teams = yield Team.getUserTeams(userId);
        res.json(teams);
    }
    catch (err) {
        next(err);
    }
});
exports.getUserTeams = getUserTeams;
const switchUserTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.params;
        const { userId } = req.user;
        const user = yield Team.switchUserTeam(teamId, userId);
        res.json(user);
    }
    catch (err) {
        next(err);
    }
});
exports.switchUserTeam = switchUserTeam;
