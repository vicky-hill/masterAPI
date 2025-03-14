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
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const Project = __importStar(require("./projects.functions"));
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team } = req.user;
        const projects = yield Project.getProjects(team);
        res.json(projects);
    }
    catch (err) {
        next(err);
    }
});
exports.getProjects = getProjects;
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;
        const data = yield Project.getProject(projectId, userId);
        res.json(data);
    }
    catch (err) {
        next(err);
    }
});
exports.getProject = getProject;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team } = req.user;
        const project = yield Project.createProject(req.body, team);
        res.json(project);
    }
    catch (err) {
        next(err);
    }
});
exports.createProject = createProject;
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
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId } = req.user;
        const project = yield Project.updateProject(req.body, projectId, userId);
        res.json(project);
    }
    catch (err) {
        next(err);
    }
});
exports.updateProject = updateProject;
