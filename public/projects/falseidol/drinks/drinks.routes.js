"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const drinks_controller_1 = require("./drinks.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   @ /drinks
==================================== */
router.route('/').get(drinks_controller_1.getDrinks);
router.route('/').post(drinks_controller_1.createDrink);
router.route('/:drinkId').put(middleware_1.protect, middleware_1.isAdmin, drinks_controller_1.updateDrink);
router.route('/sync').get(drinks_controller_1.syncDrinks);
exports.default = router;
