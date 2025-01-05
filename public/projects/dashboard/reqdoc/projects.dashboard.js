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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const projects_model_1 = __importDefault(require("../../reqdoc/projects/projects.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projects_model_1.default.find();
        res.json(projects);
    }
    catch (err) {
        err.ctrl = exports.getProjects;
        next(err);
    }
});
exports.getProjects = getProjects;
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const project = yield projects_model_1.default.findById(projectId);
        if (!project)
            return (0, throwError_1.default)('Project not found');
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.getProject;
        next(err);
    }
});
exports.getProject = getProject;
const createProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const project = yield projects_model_1.default.create(req.body);
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.createProject;
        next(err);
    }
});
exports.createProject = createProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { projectId } = req.params;
        const updatedProject = yield projects_model_1.default.findByIdAndUpdate(projectId, req.body, { new: true });
        res.json(updatedProject);
    }
    catch (err) {
        err.ctrl = exports.updateProject;
        next(err);
    }
});
exports.updateProject = updateProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const project = yield projects_model_1.default.findByIdAndDelete(projectId);
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.deleteProject;
        next(err);
    }
});
exports.deleteProject = deleteProject;
