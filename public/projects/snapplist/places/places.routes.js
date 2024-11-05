"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const places_controller_1 = require("./places.controller");
const router = express_1.default.Router();
router.route('/').get(places_controller_1.test);
// router.route('/').post(createPlace);
// router.route('/:id/photos').get(getPhotos);
exports.default = router;
