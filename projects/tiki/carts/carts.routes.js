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

router.route('/all').get(cartCtrl.getAllCarts)

/** 
* @post api/tiki/cart/guest - Add to guest
* @post api/tiki/cart/guest/:cartID - Get guest cart by cartID
* @post api/tiki/cart/guest/:cartID/convert - Convert guest cart to user cart
*/
router.route('/guest').post(cartCtrl.addToGuestCart)
router.route('/guest/:cartID').get(cartCtrl.getGuestCart)
router.route('/guest/:cartID/convert').put(protect, cartCtrl.convertCart)

router.route('/:cartItemID/update').put(cartCtrl.updateQuantity)



module.exports = router; 