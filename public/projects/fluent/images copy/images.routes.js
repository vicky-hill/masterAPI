"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_controller_1 = require("./images.controller");
const router = express_1.default.Router();
/* ====================================
   @ api/fluent/images
==================================== */
router.route('/').get(images_controller_1.getImages);
router.route('/').post(images_controller_1.createImage);
router.route('/:imageId').get(images_controller_1.getImage);
router.route('/:imageId').delete(images_controller_1.deleteImage);
router.route('/:imageId').put(images_controller_1.updateImage);
exports.default = router;
