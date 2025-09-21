"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const words_controller_1 = require("./words.controller");
const router = express_1.default.Router();
/* ====================================
   @ /fluent/words
==================================== */
router.get('/', words_controller_1.getAllWords);
router.post('/adjectives', words_controller_1.createAdjectives);
exports.default = router;
