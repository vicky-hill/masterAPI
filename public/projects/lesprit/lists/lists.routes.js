"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const lists_controller_1 = require("./lists.controller");
const router = express_1.default.Router();
/* ====================================
   Users @ api/lesprit/lists
==================================== */
router.route('/').get(middleware_1.protect, lists_controller_1.getLists);
router.route('/').post(middleware_1.protect, lists_controller_1.createList);
router.route('/public').get(middleware_1.protect, lists_controller_1.getPublicLists);
router.route('/public/add/:listId').put(middleware_1.protect, lists_controller_1.addListToUser);
router.route('/public/remove/:listId').put(middleware_1.protect, lists_controller_1.removeListFromUser);
router.route('/:listId').get(middleware_1.protect, lists_controller_1.getList);
router.route('/:listId').post(middleware_1.protect, lists_controller_1.createList);
router.route('/:listId').put(middleware_1.protect, lists_controller_1.updateList);
router.route('/:listId').delete(middleware_1.protect, lists_controller_1.deleteList);
exports.default = router;
