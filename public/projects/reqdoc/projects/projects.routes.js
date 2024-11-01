"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const projects_controller_1 = require("./projects.controller");
const router = express_1.default.Router();
/**
 * @get api/reqdoc/projects - get all projects
 * @post api/reqdoc/projects - create new project
 */
router
    .route('/')
    .get(middleware_1.protect, projects_controller_1.getProjects)
    .post(middleware_1.protect, projects_controller_1.createProject);
/**
 * @get api/reqdoc/projects/:projectID - get project by id
 * @put api/reqdoc/projects/:projectID - update project
 * @delete api/reqdoc/projects/:projectID - delete project
 */
router.route('/:projectID').get(middleware_1.protect, projects_controller_1.getProject);
router.route('/:projectID').delete(middleware_1.protect, projects_controller_1.deleteProject);
router.route('/:projectID').put(middleware_1.protect, projects_controller_1.updateProject);
exports.default = router;
