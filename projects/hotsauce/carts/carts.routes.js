const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/decodeToken');

const cartCtrl = require('./carts.controller');

/**
 * @route /api/hotsauce/cart
 * @get get current user cart
 * @post add to cart
 */
router
    .route('/')
    .get(protect, cartCtrl.getCart)
    .post(protect, cartCtrl.addToCart)


module.exports = router; 