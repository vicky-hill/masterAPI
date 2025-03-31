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
exports.updateProject = exports.deleteProject = exports.createProject = exports.getProject = exports.getProjects = void 0;
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
const projects_model_1 = __importDefault(require("./projects.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const populate_1 = require("../utils/populate");
const access_1 = require("../utils/access");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const redis_1 = require("../../../utils/redis");
const getProjects = (team) => __awaiter(void 0, void 0, void 0, function* () {
    const projects = yield projects_model_1.default.find({ team, deleted: { $exists: false } })
        .populate(populate_1.features);
    const response = {
        data: projects.map(({ _id, name, slug, first_feature, team }) => ({
            _id, name, slug, team, first_feature
        }))
    };
    return response;
});
exports.getProjects = getProjects;
const getProject = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    const cacheKey = `projects:project:${projectId}`;
    const cached = yield (0, redis_1.getValue)(cacheKey);
    if (cached)
        return cached;
    const projectInstance = yield projects_model_1.default.findById(projectId)
        .populate([Object.assign(Object.assign({}, populate_1.features), { populate: populate_1.subFeatures }), populate_1.team]);
    if (!projectInstance)
        return (0, throwError_1.default)('Project not found');
    const projectObject = projectInstance.toObject();
    const reqs = yield reqs_model_1.default
        .find({
        project: projectId,
        changed_req: { $exists: false },
        deleted: { $exists: false }
    })
        .populate([populate_1.history])
        .sort({ sort: 1 });
    const project = {
        _id: projectObject._id,
        id: projectObject.id,
        key: projectObject.key,
        team: projectObject.team,
        slug: projectObject.slug,
        mame: projectObject.name,
        first_feature: projectObject.first_feature
    };
    const features = projectObject.features;
    const data = { project, features, reqs };
    yield (0, redis_1.setValue)(cacheKey, data);
    return data;
});
exports.getProject = getProject;
const createProject = (data, team) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.createProject({ data, team });
    const project = yield projects_model_1.default.create(Object.assign(Object.assign({}, data), { team }));
    return project;
});
exports.createProject = createProject;
const deleteProject = (projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    const project = yield (0, delete_1.cascadeDeleteProject)(projectId);
    return project;
});
exports.deleteProject = deleteProject;
const updateProject = (data, projectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield validation_1.default.updateProject(data);
    yield (0, access_1.checkProjectAccess)(projectId, userId);
    const project = yield projects_model_1.default.findByIdAndUpdate(projectId, data, { new: true });
    return project;
});
exports.updateProject = updateProject;
