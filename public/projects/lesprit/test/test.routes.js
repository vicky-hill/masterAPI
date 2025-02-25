"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const test_controller_1 = require("./test.controller");
const router = express_1.default.Router();
/* ====================================
   Users @ api/lesprit/test
==================================== */
router.route('/').get(test_controller_1.getLists);
router.route('/').post(test_controller_1.createList);
router.route('/:listId').get(test_controller_1.getList);
router.route('/:listId').put(test_controller_1.updateList);
router.route('/:listId').delete(test_controller_1.deleteList);
exports.default = router;
// Option with protect
// ========================================
// import express from 'express'
// import { createList, deleteList, getList, getLists, updateList } from './test.controller'
// import { protect } from '../utils/middleware'
// const router: any = express.Router()
// /* ====================================
//    Users @ api/lesprit/test
// ==================================== */
// router.route('/').get(protect, getLists)
// router.route('/').post(protect, createList)
// router.route('/:listId').get(protect, getList)
// router.route('/:listId').put(protect, updateList)
// router.route('/:listId').delete(protect, deleteList)
// export default router;
