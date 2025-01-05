"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_controller_1 = require("./features.controller");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
/* ====================================
   Features @ api/reqdoc/features
==================================== */
router.route('/sort').put(middleware_1.protect, features_controller_1.sortFeatures);
router.route('/:featureId').get(middleware_1.protect, features_controller_1.getFeature);
router.route('/:featureId').put(middleware_1.protect, features_controller_1.updateFeature);
router.route('/:featureId').delete(middleware_1.protect, features_controller_1.deleteFeature);
router.route('/:featureId/sub').post(middleware_1.protect, features_controller_1.createSubFeature);
router.route('/:projectId').get(middleware_1.protect, features_controller_1.getFeatures);
router.route('/').post(middleware_1.protect, features_controller_1.createFeature);
exports.default = router;
