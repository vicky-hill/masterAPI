"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const features_controller_1 = require("./features.controller");
const router = express_1.default.Router();
/* ====================================
   @ /features
==================================== */
router.route('/project/:projectId').get(features_controller_1.getFeatures);
exports.default = router;
