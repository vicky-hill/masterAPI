"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const verbs_controller_1 = require("./verbs.controller");
const router = express_1.default.Router();
/* ====================================
   @ api/lesprit/verbs/admin
==================================== */
router.route('/').get(middleware_1.protect, verbs_controller_1.getAdminVerbs);
router.route('/').post(middleware_1.protect, verbs_controller_1.createVerb);
router.route('/:verbId').delete(middleware_1.protect, verbs_controller_1.deleteVerb);
exports.default = router;
