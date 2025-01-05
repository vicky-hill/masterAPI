"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const features_dashboard_1 = require("./features.dashboard");
const projects_dashboard_1 = require("./projects.dashboard");
const reqs_dashboard_1 = require("./reqs.dashboard");
const teams_dashboard_1 = require("./teams.dashboard");
const users_dashboard_1 = require("./users.dashboard");
const router = express_1.default.Router();
/* ================================================
   Features @ api/dashboard/reqdoc/features
================================================ */
router.route('/features').get(features_dashboard_1.getFeatures);
router.route('/features').post(features_dashboard_1.createFeature);
router.route('/features/:featureId').get(features_dashboard_1.getFeature);
router.route('/features/:featureId').delete(features_dashboard_1.deleteFeature);
router.route('/features/:featureId').put(features_dashboard_1.updateFeature);
/* ================================================
   Projects @ api/dashboard/reqdoc/projects
================================================ */
router.route('/projects').get(projects_dashboard_1.getProjects);
router.route('/projects').post(projects_dashboard_1.createProject);
router.route('/projects/:projectId').get(projects_dashboard_1.getProject);
router.route('/projects/:projectId').delete(projects_dashboard_1.deleteProject);
router.route('/projects/:projectId').put(projects_dashboard_1.updateProject);
/* ================================================
   Reqs @ api/dashboard/reqdoc/reqs
================================================ */
router.route('/reqs').get(reqs_dashboard_1.getReqs);
router.route('/reqs').post(reqs_dashboard_1.createReq);
router.route('/reqs/:reqId').get(reqs_dashboard_1.getReq);
router.route('/reqs/:reqId').delete(reqs_dashboard_1.deleteReq);
router.route('/reqs/:reqId').put(reqs_dashboard_1.updateReq);
/* ================================================
   Teams @ api/dashboard/reqdoc/teams
================================================ */
router.route('/teams').get(teams_dashboard_1.getTeams);
router.route('/teams').post(teams_dashboard_1.createTeam);
router.route('/teams/:teamId').get(teams_dashboard_1.getTeam);
router.route('/teams/:teamId').delete(teams_dashboard_1.deleteTeam);
router.route('/teams/:teamId').put(teams_dashboard_1.updateTeam);
/* ================================================
   Users @ api/dashboard/reqdoc/users
================================================ */
router.route('/users').get(users_dashboard_1.getUsers);
router.route('/users').post(users_dashboard_1.createUser);
router.route('/users/:userId').get(users_dashboard_1.getUser);
router.route('/users/:userId').delete(users_dashboard_1.deleteUser);
router.route('/users/:userId').put(users_dashboard_1.updateUser);
exports.default = router;
