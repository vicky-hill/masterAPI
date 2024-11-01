"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const teams_controller_1 = require("./teams.controller");
const router = express_1.default.Router();
/** @get /api/reqdoc/teams/user */
router.route('/user').get(middleware_1.protect, teams_controller_1.getUserTeams);
router.route('/switch/:teamID').put(middleware_1.protect, teams_controller_1.switchUserTeam);
router.route('/:teamID').put(middleware_1.protect, teams_controller_1.updateTeam);
/**
 * @route /api/reqdoc/teams
 * @post create team
 */
router
    .route('/')
    .post(teams_controller_1.createTeam)
    .get(teams_controller_1.getTeams);
exports.default = router;
