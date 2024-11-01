"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
/** @get /api/reqdoc/user/all */
router.route('/all').get(users_controller_1.getUsers);
/**
 * @route /api/squirreled/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(users_controller_1.getUser)
    .post(users_controller_1.createUser);
exports.default = router;
