"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const settings_controller_1 = require("./settings.controller");
const router = express_1.default.Router();
/* ====================================
   @ /settings
==================================== */
router.route('/').get(settings_controller_1.getSettings);
router.route('/:settingId').put(settings_controller_1.updateSetting);
exports.default = router;
