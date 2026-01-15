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
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProjectById = exports.getProjectsByTeam = void 0;
const include_1 = require("../utils/include");
const models_1 = require("../models");
const validation_1 = __importDefault(require("../utils/validation"));
const getProjectsByTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield models_1.Project.findAll({
        where: { teamId },
        include: [include_1.includeFeatures]
    });
    return projects;
});
exports.getProjectsByTeam = getProjectsByTeam;
const getProjectById = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findByPk(projectId, {
        rejectOnEmpty: new Error('No project found'),
        include: [
            include_1.includeFeatures,
            include_1.includeTeam,
            include_1.includeReqs
        ]
    });
    yield project.checkAccess(userId);
    return project;
});
exports.getProjectById = getProjectById;
const createProject = (data, teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createProject(data);
    yield models_1.Team.checkAccess(teamId, userId);
    const project = yield models_1.Project.create(Object.assign(Object.assign({}, data), { teamId }));
    return project;
});
exports.createProject = createProject;
const deleteProject = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findByPk(projectId, {
        rejectOnEmpty: new Error('Project not found')
    });
    yield project.checkAccess(userId);
    yield project.destroy();
    return project;
});
exports.deleteProject = deleteProject;
const updateProject = (data, projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield models_1.Project.findByPk(projectId, {
        rejectOnEmpty: new Error('Project not found')
    });
    yield validation_1.default.updateProject(data);
    yield project.checkAccess(userId);
    yield project.update(data, { fields: ['name', 'projectKey'] });
    return project;
});
exports.updateProject = updateProject;
