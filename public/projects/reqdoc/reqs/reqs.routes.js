"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const reqs_controller_1 = require("./reqs.controller");
const router = express_1.default.Router();
/* ====================================
   Reqs @ api/reqdoc/reqs
==================================== */
router.route('/sort').put(middleware_1.protect, reqs_controller_1.sortReqs);
router.route('/:projectId/search').get(middleware_1.protect, reqs_controller_1.searchReqs);
router.route('/:projectKey/:reqKey/retrieve').get(middleware_1.protect, reqs_controller_1.getReqByKey);
router.route('/:reqId/change').put(middleware_1.protect, reqs_controller_1.changeReq);
router.route('/:reqId/update').put(middleware_1.protect, reqs_controller_1.updateReq);
router.route('/:reqId/retrieve').get(middleware_1.protect, reqs_controller_1.getReqById);
router.route('/:reqId/delete').delete(middleware_1.protect, reqs_controller_1.deleteReq);
router.route('/:reqId/comment').post(middleware_1.protect, reqs_controller_1.addComment);
router.route('/:commentID/comment').put(middleware_1.protect, reqs_controller_1.editComment);
router.route('/:commentID/comment').delete(middleware_1.protect, reqs_controller_1.deleteComment);
router.route('/feature/:featureId').get(middleware_1.protect, reqs_controller_1.getFeatureReqs);
router.route('/project/:projectId').get(middleware_1.protect, reqs_controller_1.getProjectReqs);
router.route('/').post(middleware_1.protect, reqs_controller_1.createReq);
exports.default = router;
