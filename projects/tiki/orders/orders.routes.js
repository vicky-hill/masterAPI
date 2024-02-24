const express = require('express');
const router = express.Router();

const ordersCtrl = require('./orders.controller');

router.route('/').post(ordersCtrl.createOrder)

/**
 * @post /api/tiki/orders/checkout
 */
router.route('/checkout').post(ordersCtrl.checkout)





module.exports = router; 