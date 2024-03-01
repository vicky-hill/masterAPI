const express = require('express');
const router = express.Router();
const { extractUser } = require('../middleware');

const cartCtrl = require('./carts.controller');

// dev routes
router.route('/delete-all').delete(cartCtrl.deleteAll)

/** 
* @get api/tiki/cart - Get all carts
* @put api/tiki/cart/:cartID/add - Add item to cart
* @get api/tiki/cart/:cartID/retrieve - Get a cart
* @get api/tiki/cart/:cartID/merge - Merge guest cart into user cart
*/
router.route('/').get(cartCtrl.getAllCarts)
router.route('/:cartID/add').put(extractUser, cartCtrl.addItem)
router.route('/:cartID/retrieve').get(extractUser, cartCtrl.retrieveCart)
router.route('/:cartID/convert').put(extractUser, cartCtrl.convertCart)

/** 
* @put api/tiki/cart/:cartItemID/update - Update cart item quantity
* @put api/tiki/cart/:cartItemID/remove - Remove item from cart
*/
router.route('/:cartItemID/update').put(cartCtrl.updateQuantity)
router.route('/:cartItemID/remove').put(cartCtrl.removeItem)


module.exports = router; 