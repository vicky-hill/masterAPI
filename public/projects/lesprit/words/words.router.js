"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const words_controller_1 = require("./words.controller");
const router = express_1.default.Router();
/* ====================================
   Users @ api/lesprit/words
==================================== */
router.route('/').get(middleware_1.protect, words_controller_1.getWords);
router.route('/').post(middleware_1.protect, words_controller_1.createWord);
router.route('/:review').get(middleware_1.protect, words_controller_1.getReview);
router.route('/:wordId').get(middleware_1.protect, words_controller_1.getWord);
router.route('/:wordId').post(middleware_1.protect, words_controller_1.createWord);
router.route('/:wordId').put(middleware_1.protect, words_controller_1.updateWord);
router.route('/:wordId').delete(middleware_1.protect, words_controller_1.deleteWord);
exports.default = router;
