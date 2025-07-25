"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const words_controller_1 = require("./words.controller");
const router = express_1.default.Router();
/* ====================================
   @ api/fluent/words
==================================== */
router.route('/').post(words_controller_1.createWord);
router.route('/:language').get(words_controller_1.getWordsByLanguage);
exports.default = router;
