"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const phrases_controller_1 = require("./phrases.controller");
const router = express_1.default.Router();
/* ====================================
   @ /phrases
==================================== */
router.route('/').get(phrases_controller_1.getPhrases);
router.route('/').post(phrases_controller_1.createPhrase);
router.route('/:phraseId').get(phrases_controller_1.getPhrase);
router.route('/:phraseId').put(phrases_controller_1.updatePhrase);
router.route('/:phraseId').delete(phrases_controller_1.deletePhrase);
exports.default = router;
