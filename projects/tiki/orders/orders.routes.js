const express = require('express');
const router = express.Router();

const ordersCtrl = require('./orders.controller');

/**
 * @route /api/tiki/orders/checkout

 */
router.route('/checkout').post(ordersCtrl.checkout)


module.exports = router; 