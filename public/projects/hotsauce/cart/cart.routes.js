"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_controller_1 = require("./cart.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   Users @ api/hotsauce/products
==================================== */
router.route('/').get(middleware_1.protect, cart_controller_1.getCart);
router.route('/').post(middleware_1.protect, cart_controller_1.addToCart);
exports.default = router;
