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
const projects_model_1 = __importDefault(require("./projects.model"));
const reqs_model_1 = __importDefault(require("../reqs/reqs.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const populate_1 = require("../utils/populate");
const access_1 = require("../utils/access");
const validation_1 = __importDefault(require("../utils/validation"));
const delete_1 = require("../utils/delete");
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team } = req.user;
        const projects = yield projects_model_1.default.find({ team, deleted: { $exists: false } })
            .populate(populate_1.feature);
        const response = {
            data: projects.map(({ _id, name, slug, first_feature, team }) => ({
                _id, name, slug, team, first_feature
            }))
        };
        res.json(response);
    }
    catch (err) {
        err.ctrl = exports.getProjects;
        next(err);
    }
});
exports.getProjects = getProjects;
const getProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkProjectAccess)(projectID, userID);
        const projectInstance = yield projects_model_1.default.findById(projectID)
            .populate([Object.assign(Object.assign({}, populate_1.feature), { populate: populate_1.subFeatures }), populate_1.team]);
        if (!projectInstance)
            return (0, throwError_1.default)('Project not found');
        const projectObject = projectInstance.toObject();
        const reqs = yield reqs_model_1.default
            .find({
            project: projectID,
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
        // redisClient.get('project', (err, project) => {
        //     if (err) console.log(err)
        //     if (photos) {
        //         return res.json(JSON.parse(project))
        //     } else {
        //         return res.json({ msg: 'no redis cache'})
        //     }
        // })
        // redisClient.set('project', JSON.stringify(data));
        res.json(data);
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
        const { team } = req.user;
        yield validation_1.default.createProject(Object.assign(Object.assign({}, req.body), { team }));
        const project = yield projects_model_1.default.create(Object.assign(Object.assign({}, req.body), { team }));
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.createProject;
        next(err);
    }
});
exports.createProject = createProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectID } = req.params;
        const { userID } = req.user;
        yield (0, access_1.checkProjectAccess)(projectID, userID);
        const project = yield (0, delete_1.cascadeDeleteProject)(projectID);
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.deleteProject;
        next(err);
    }
});
exports.deleteProject = deleteProject;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body;
        const { projectID } = req.params;
        const { userID } = req.user;
        yield validation_1.default.updateProject(req.body);
        yield (0, access_1.checkProjectAccess)(projectID, userID);
        const project = yield projects_model_1.default.findByIdAndUpdate(projectID, req.body, { new: true });
        res.json(project);
    }
    catch (err) {
        err.ctrl = exports.updateProject;
        next(err);
    }
});
exports.updateProject = updateProject;
