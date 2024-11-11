"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const neighborhoods_controller_1 = require("./neighborhoods.controller");
const router = express_1.default.Router();
/**
 * @get api/snapplist/neighborhoods - get all neighborhoods
 * @post api/snapplist/neighborhoods - create new neighborhood
 */
router.route('/').get(neighborhoods_controller_1.getNeighborhoods);
router.route('/').post(neighborhoods_controller_1.createNeighborhood);
/**
 * @get api/snapplist/projects/:neighborhoodID - get neighborhood by id
 * @put api/snapplist/projects/:neighborhoodID - update neighborhood
 * @delete api/snapplist/projects/:neighborhoodID - delete neighborhood
 */
router.route('/:neighborhoodId').get(neighborhoods_controller_1.getNeighborhoodById);
router.route('/:neighborhoodId').delete(neighborhoods_controller_1.deleteNeighborhood);
router.route('/:neighborhoodId').put(neighborhoods_controller_1.updateNeighborhood);
exports.default = router;
