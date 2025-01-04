"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const router = express_1.default.Router();
/* ====================================
   Users @ api/hotsauce/products
==================================== */
router.route('/').get(products_controller_1.getProducts);
router.route('/').post(products_controller_1.createProduct);
router.route('/:productId').get(products_controller_1.getProduct);
router.route('/:productId').put(products_controller_1.updateProduct);
router.route('/:productId').delete(products_controller_1.deleteProduct);
exports.default = router;
