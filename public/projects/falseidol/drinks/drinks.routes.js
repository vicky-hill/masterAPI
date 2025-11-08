"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drinks_controller_1 = require("./drinks.controller");
const router = express_1.default.Router();
/* ====================================
   @ /drinks
==================================== */
router.route('/').get(drinks_controller_1.getDrinks);
router.route('/sync').get(drinks_controller_1.syncDrinks);
exports.default = router;
