const express = require('express');
const router = express.Router();

const productCtrl = require('./products.controller');

/**
 * @route /api/hotsauce/products
 * @get get all products
 * @post save a product
 */
router
    .route('/')
    .get(productCtrl.getProducts)
    .post(productCtrl.saveProduct)

/**
 * @route /api/hotsauce/products/:id
 * @get get one product
 * @put update product
 * @delete remove product
 */
router 
    .route('/:id')
    .get(productCtrl.getProduct)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)

module.exports = router; 