"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teams_controller_1 = require("./teams.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   @ /teams
==================================== */
router.route('/').get(middleware_1.protect, teams_controller_1.getTeams);
router.route('/add/:userId').put(middleware_1.protect, teams_controller_1.addUserToCurrentTeam);
router.route('/remove/:userId').put(middleware_1.protect, teams_controller_1.removeUserFromCurrentTeam);
exports.default = router;
