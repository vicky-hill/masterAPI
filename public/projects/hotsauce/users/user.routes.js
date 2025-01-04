"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
/* ====================================
   Users @ api/hotsauce/user
==================================== */
router.route('/').get(middleware_1.protect, users_controller_1.getUser);
router.route('/').post(users_controller_1.createUser);
exports.default = router;
