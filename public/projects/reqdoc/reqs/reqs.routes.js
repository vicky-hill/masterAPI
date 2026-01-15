"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqs_controller_1 = require("./reqs.controller");
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   @ /reqs
==================================== */
router.route('/').post(middleware_1.protect, reqs_controller_1.createReq);
router.route('/:projectId/search').get(middleware_1.protect, reqs_controller_1.searchReqs);
router.route('/feature/:featureId').get(middleware_1.protect, reqs_controller_1.getReqsByFeatureId);
router.route('/:projectKey/:reqKey').get(middleware_1.protect, reqs_controller_1.getReqByKey);
router.route('/sort').put(middleware_1.protect, reqs_controller_1.sortReqs);
router.route('/:reqId').get(middleware_1.protect, reqs_controller_1.getReqById);
router.route('/:reqId').put(middleware_1.protect, reqs_controller_1.updateReq);
router.route('/:reqId').delete(middleware_1.protect, reqs_controller_1.deleteReq);
router.route('/change/:reqId').put(middleware_1.protect, reqs_controller_1.changeReq);
exports.default = router;
