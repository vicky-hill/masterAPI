"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_controller_1 = require("./posts.controller");
const router = express_1.default.Router();
/* ====================================
   @ /posts
==================================== */
router.route('/').get(posts_controller_1.getPosts);
exports.default = router;
