"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   @ /users
==================================== */
router.route('/').get(middleware_1.protect, middleware_1.isAdmin, users_controller_1.getUsers);
router.route('/').post(users_controller_1.createUser);
router.route('/current').get(middleware_1.protect, users_controller_1.getCurrentUser);
router.route('/login').post(middleware_1.protect, users_controller_1.loginUser);
router.route('/:userId').get(users_controller_1.getUser);
router.route('/:userId').put(middleware_1.protect, middleware_1.isAdmin, users_controller_1.updateUser);
router.route('/:userId').delete(users_controller_1.deleteUser);
exports.default = router;
