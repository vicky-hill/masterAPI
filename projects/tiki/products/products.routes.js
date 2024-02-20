const express = require('express');
const router = express.Router();

const productCtrl = require('./products.controller');

/**
 * @route /api/tiki/products
 * @get get all products
 * @post save a product
 */
router.route('/').get(productCtrl.getProducts)
router.route('/').post(productCtrl.saveProduct)

router.route('/imagekit').get(productCtrl.imageKitAuth);
router.route('/sort').put(productCtrl.sortProducts);
router.route('/url-check/:urlKey').get(productCtrl.checkURLKey)

/**
 * @route /api/tiki/products/key/:urlKey
 * @get get one product by URL
 */
router.route('/key/:urlKey').get(productCtrl.getProductByUrlKey)
router.route('/category/:categoryName').get(productCtrl.getCategoryProducts)

/**
 * @route /api/tiki/products/:productID
 * @get get one product by ID
 * @put update product
 * @delete remove product
 */
router
    .route('/:productID')
    .get(productCtrl.getProductByID)
    .put(productCtrl.updateProduct)
    .delete(productCtrl.deleteProduct)

module.exports = router; 