"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_controller_1 = require("./features.controller");
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../utils/middleware");
const router = express_1.default.Router();
router.route('/sort').put(middleware_1.protect, features_controller_1.sortFeatures);
/**
* @post api/reqdoc/features/:featureID/sub - create a sub feature
*/
router.route('/:featureID/sub').post(middleware_1.protect, features_controller_1.createSubFeature);
/**
 * @get api/reqdoc/features/:featureID
 * @get api/reqdoc/features/:featureID
 * @get api/reqdoc/features/:featureID
 */
router.route('/:featureID').get(middleware_1.protect, features_controller_1.getFeature);
router.route('/:featureID').put(middleware_1.protect, features_controller_1.updateFeature);
router.route('/:featureID').delete(middleware_1.protect, features_controller_1.deleteFeature);
/**
* @get api/reqdoc/features/:projectID - get all features by project
* @post api/reqdoc/features - create new feature
*/
router.route('/:projectID').get(middleware_1.protect, features_controller_1.getFeatures);
router.route('/').post(middleware_1.protect, features_controller_1.createFeature);
exports.default = router;
