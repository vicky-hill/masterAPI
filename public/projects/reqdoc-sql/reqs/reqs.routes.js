"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reqs_controller_1 = require("./reqs.controller");
const router = express_1.default.Router();
/* ====================================
   @ /reqs
==================================== */
router.route('/').get(reqs_controller_1.getReqs);
router.route('/').post(reqs_controller_1.createReq);
router.route('/:reqId').get(reqs_controller_1.getReq);
router.route('/:reqId').put(reqs_controller_1.updateReq);
router.route('/:reqId').delete(reqs_controller_1.deleteReq);
exports.default = router;
