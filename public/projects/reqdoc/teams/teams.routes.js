"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const teams_controller_1 = require("./teams.controller");
const router = express_1.default.Router();
/* ====================================
   Teams @ api/reqdoc/team
==================================== */
router.route('/user').get(middleware_1.protect, teams_controller_1.getUserTeams);
router.route('/switch/:teamId').put(middleware_1.protect, teams_controller_1.switchUserTeam);
router.route('/:teamId').put(middleware_1.protect, teams_controller_1.updateTeam);
router.route('/').post(teams_controller_1.createTeam);
router.route('/').get(teams_controller_1.getTeams);
exports.default = router;
