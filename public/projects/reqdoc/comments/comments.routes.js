"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comments_controller_1 = require("./comments.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   @ /comments
==================================== */
router.route('/req/:reqId').post(middleware_1.protect, comments_controller_1.addComment);
router.route('/req/:commentID').put(middleware_1.protect, comments_controller_1.editComment);
router.route('/req/:commentID').delete(middleware_1.protect, comments_controller_1.deleteComment);
exports.default = router;
