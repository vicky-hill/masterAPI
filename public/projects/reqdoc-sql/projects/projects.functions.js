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
exports.createProject = exports.getProject = exports.getProjects = void 0;
const include_1 = require("../utils/include");
const access_1 = require("../utils/access");
const redis_1 = require("../../../utils/redis");
const models_1 = require("../models");
const validation_1 = __importDefault(require("../utils/validation"));
const getProjects = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    //     const projectInstances = await ProjectModel.findAll({
    //         where: { teamId, deleted: null },
    //         include: [includeFeatures]
    //     })
    // 
    //     return projectInstances.map(projectInstance => {
    //         const project = projectInstance.get({ plain: true });
    // 
    //         return {
    //             ...project,
    //             firstFeatureId: project.features?.length && project.features[0].featureId
    //         }
    //     })
});
exports.getProjects = getProjects;
const getProject = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    const cacheKey = `projects:project:${projectId}`;
    const cached = yield (0, redis_1.getValue)(cacheKey);
    if (cached)
        return cached;
    const projectInstance = yield models_1.ProjectModel.findByPk(projectId, {
        include: [
            include_1.includeFeatures,
            include_1.includeTeam
        ]
    });
    if (!projectInstance)
        throw new Error('No project found');
    //     const project = projectInstance.get({ plain: true });
    // 
    //     const reqs = await ReqModel.findAll({
    //         where: { projectId, changedReq: null, deleted: null },
    //         order: ['sort', 'ASC']
    //     })
    // const project = {
    //     _id: project._id,
    //     id: project.id,
    //     key: project.key,
    //     team: project.team,
    //     slug: project.slug,
    //     mame: project.name,
    //     first_feature: project.first_feature
    // }
    //     const features = project.features;
    //     const data = { project, features, reqs };
    // 
    //     await setValue(cacheKey, data);
    // return data;
});
exports.getProject = getProject;
const createProject = (data, teamId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createProject({ data, teamId });
    const project = yield models_1.ProjectModel.create(Object.assign(Object.assign({}, data), { teamId }));
    return project;
});
exports.createProject = createProject;
