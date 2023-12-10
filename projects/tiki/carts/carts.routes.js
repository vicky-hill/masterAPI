const express = require('express');
const router = express.Router();
const { protect, extractUser } = require('../middleware');

const cartCtrl = require('./carts.controller');

/** 
* @put api/tiki/cart/:cartID/add - Add item to cart
* @put api/tiki/cart/:cartID/convert - Convert guest cart to user cart
* @get api/tiki/cart/:cartID/retrieve - Get a cart
* @get api/tiki/cart/:cartID/list - Get all carts
*/
router.route('/').get(cartCtrl.getAllCarts)
router.route('/:cartID/add').put(extractUser, cartCtrl.addItem)
router.route('/:cartID/convert').put(protect, cartCtrl.convertCart)
router.route('/:cartID/retrieve').get(extractUser, cartCtrl.retrieveCart)
router.route('/:cartID/merge').put(extractUser, cartCtrl.mergeCart)

/** 
* @put api/tiki/cart/:cartID/add - Add item to cart
* @put api/tiki/cart/:cartItemID/update - Update cart item quantity
* @put api/tiki/cart/:cartItemID/remove - Remove item from cart
*/
router.route('/:cartID/add').put(extractUser, cartCtrl.addItem)
router.route('/:cartItemID/update').put(cartCtrl.updateQuantity)
router.route('/:cartItemID/remove').put(cartCtrl.removeItem)



module.exports = router; 