"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const groups_controller_1 = require("./groups.controller");
const router = express_1.default.Router();
/* ====================================
   @ api/fluent/groups
==================================== */
router.route('/').get(groups_controller_1.getGroups);
router.route('/').post(groups_controller_1.createGroup);
router.route('/:groupId').get(groups_controller_1.getGroup);
router.route('/:groupId').delete(groups_controller_1.deleteGroup);
router.route('/:groupId').put(groups_controller_1.updateGroup);
exports.default = router;
