const express = require('express');
const router = express.Router();

const ordersCtrl = require('./orders.controller');

router.route('/').get(ordersCtrl.getOrders)
router.route('/').post(ordersCtrl.createOrder)
router.route('/:orderID').get(ordersCtrl.getOrderByID)

/**
 * @post /api/tiki/orders/checkout
 */
router.route('/checkout').post(ordersCtrl.checkout)
router.route('/test').get(ordersCtrl.test)





module.exports = router; 