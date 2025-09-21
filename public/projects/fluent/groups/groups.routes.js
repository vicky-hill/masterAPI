"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groups_controller_1 = require("./groups.controller");
const router = express_1.default.Router();
/* ====================================
   @ /fluent/groups
==================================== */
router.get('/', groups_controller_1.getAllGroups);
router.get('/neat', groups_controller_1.getNeatGroups);

exports.default = router;
