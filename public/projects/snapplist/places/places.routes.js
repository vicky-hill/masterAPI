"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const places_controller_1 = require("./places.controller");
const router = express_1.default.Router();
/* ================================================
   Places @ api/snapplist/places/search
================================================ */
router.route('/search').get(places_controller_1.test);
// router.route('/delete').delete(deleteAllPlaces);
/* ================================================
   Places @ api/snapplist/places
================================================ */
router.route('/').get(places_controller_1.getPlaces);
router.route('/:placeId').delete(places_controller_1.deletePlace);
exports.default = router;
