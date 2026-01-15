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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjectsByTeam = void 0;
const Project = __importStar(require("./projects.functions"));
const getProjectsByTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId } = req.user;
        const projects = yield Project.getProjectsByTeam(teamId);
        res.json(projects);
    }
    catch (err) {
        next(err);
    }
});
exports.getProjectsByTeam = getProjectsByTeam;
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;
        const data = yield Project.getProjectById(projectId, userId);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.getProjectById = getProjectById;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId, userId } = req.user;
        const project = yield Project.createProject(req.body, teamId, userId);
        res.json(project);
    }
    catch (err) {
        next(err);
    }
});
exports.createProject = createProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId } = req.params;
        const project = yield Project.updateProject(req.body, projectId, userId);
        res.json(project);
    }
    catch (err) {
        next(err);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;
        const project = yield Project.deleteProject(projectId, userId);
        res.json(project);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProject = deleteProject;
