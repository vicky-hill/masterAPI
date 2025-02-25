"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const words_controller_1 = require("../words/words.controller");
const router = express_1.default.Router();
/* ====================================
   @ api/lesprit/admin/words
==================================== */
router.route('/words').get(middleware_1.protect, words_controller_1.getWords);
exports.default = router;
