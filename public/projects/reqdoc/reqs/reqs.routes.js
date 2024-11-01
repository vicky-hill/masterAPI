"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const reqs_controller_1 = require("./reqs.controller");
const router = express_1.default.Router();
/**
* @put api/reqdoc/reqs/sort - sort reqs
* @get api/reqdoc/reqs/:projectID/search - search reqs
* @post api/reqdoc/reqs/:reqID/change - change a req
* @post api/reqdoc/reqs/:reqID/update - update a req
* @post api/reqdoc/reqs/:reqID/retrieve - get a single req
*/
router.route('/sort').put(middleware_1.protect, reqs_controller_1.sortReqs);
router.route('/:projectID/search').get(middleware_1.protect, reqs_controller_1.searchReqs);
router.route('/:projectKey/:reqKey/retrieve').get(middleware_1.protect, reqs_controller_1.getReqByKey);
router.route('/:reqID/change').put(middleware_1.protect, reqs_controller_1.changeReq);
router.route('/:reqID/update').put(middleware_1.protect, reqs_controller_1.updateReq);
router.route('/:reqID/retrieve').get(middleware_1.protect, reqs_controller_1.getReqById);
router.route('/:reqID/delete').delete(middleware_1.protect, reqs_controller_1.deleteReq);
/**
 * @post api/reqdoc/reqs/:reqID/comment - add a comment
 * @put api/reqdoc/reqs/:commentID/comment - edit a comment
 * @delete api/reqdoc/reqs/:commentID/comment - delete a comment
 */
router.route('/:reqID/comment').post(middleware_1.protect, reqs_controller_1.addComment);
router.route('/:commentID/comment').put(middleware_1.protect, reqs_controller_1.editComment);
router.route('/:commentID/comment').delete(middleware_1.protect, reqs_controller_1.deleteComment);
/**
 * @get api/reqdoc/reqs/:featureID - get reqs by feature
 */
router.route('/feature/:featureID').get(middleware_1.protect, reqs_controller_1.getFeatureReqs);
router.route('/project/:projectID').get(middleware_1.protect, reqs_controller_1.getProjectReqs);
/**
 * @post api/reqdoc/reqs - create new req
 */
router
    .route('/')
    .post(middleware_1.protect, reqs_controller_1.createReq);
exports.default = router;
