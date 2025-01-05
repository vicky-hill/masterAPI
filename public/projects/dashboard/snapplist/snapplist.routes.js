"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const neighborhoods_dashboard_1 = require("./neighborhoods.dashboard");
const categories_dashboard_1 = require("./categories.dashboard");
const places_dashboard_1 = require("./places.dashboard");
const router = express_1.default.Router();
/* =======================================================
   Neighborhoods @ api/dashboard/snapplist/neighborhoods
======================================================= */
router.route('/neighborhoods').get(neighborhoods_dashboard_1.getNeighborhoods);
router.route('/neighborhoods').post(neighborhoods_dashboard_1.createNeighborhood);
router.route('/neighborhoods/:neighborhoodId').get(neighborhoods_dashboard_1.getNeighborhood);
router.route('/neighborhoods/:neighborhoodId').delete(neighborhoods_dashboard_1.deleteNeighborhood);
router.route('/neighborhoods/:neighborhoodId').put(neighborhoods_dashboard_1.updateNeighborhood);
/* =======================================================
   Categories @ api/dashboard/snapplist/categories
======================================================= */
router.route('/categories').get(categories_dashboard_1.getCategories);
router.route('/categories').post(categories_dashboard_1.createCategory);
router.route('/categories/:categoryId').get(categories_dashboard_1.getCategory);
router.route('/categories/:categoryId').delete(categories_dashboard_1.deleteCategory);
router.route('/categories/:categoryId').put(categories_dashboard_1.updateCategory);
/* =======================================================
   Places @ api/dashboard/snapplist/places
======================================================= */
router.route('/places').get(places_dashboard_1.getPlaces);
router.route('/places').post(places_dashboard_1.createPlace);
router.route('/places/:placeId').get(places_dashboard_1.getPlace);
router.route('/places/:placeId').delete(places_dashboard_1.deletePlace);
router.route('/places/:placeId').put(places_dashboard_1.updatePlace);
exports.default = router;
