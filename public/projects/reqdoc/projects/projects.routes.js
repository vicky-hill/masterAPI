"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const projects_controller_1 = require("./projects.controller");
const router = express_1.default.Router();
/* ====================================
   Projects @ api/reqdoc/projects
==================================== */
router.route('/').get(middleware_1.protect, projects_controller_1.getProjects);
router.route('/').post(middleware_1.protect, projects_controller_1.createProject);
router.route('/:projectId').get(middleware_1.protect, projects_controller_1.getProject);
router.route('/:projectId').delete(middleware_1.protect, projects_controller_1.deleteProject);
router.route('/:projectId').put(middleware_1.protect, projects_controller_1.updateProject);
exports.default = router;
