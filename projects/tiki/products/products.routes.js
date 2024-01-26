const express = require('express');
const router = express.Router();

const productCtrl = require('./products.controller');

/**
 * @route /api/tiki/products
 * @get get all products
 * @post save a product
 */
router
    .route('/')
    .get(productCtrl.getProducts)
    .post(productCtrl.saveProduct)

/**
 * @route /api/tiki/products/:productID
 * @get get one product
 * @put update product
 * @delete remove product
 */
router 
    .route('/:productID')
    .get(productCtrl.getProduct)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)

module.exports = router; 