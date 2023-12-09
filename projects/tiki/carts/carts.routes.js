const express = require('express');
const router = express.Router();
const { protect } = require('../middleware');

const cartCtrl = require('./carts.controller');

/**
 * @route /api/tiki/cart
 * @get get current user cart
 * @post add to cart
 */
router
    .route('/')
    .get(protect, cartCtrl.getCart)
    .post(protect, cartCtrl.addToCart)

/** 
* @put api/tiki/cart/guest - Add to guest
*/
router.route('/guest').post(cartCtrl.addToGuestCart)
router.route('/all').get(cartCtrl.getAllCarts)
// router.route('/:cartID/add').post(cartCtrl)


module.exports = router; 