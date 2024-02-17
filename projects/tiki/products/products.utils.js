const Product = require('./products.model')
const checkResource = require('../../../utils/checkResource')

/**
 * Get product by ID
 * @param {objectId} productID
 * @returns <Promise> {Product}
 */
const getProductByID = async function (productID) {
    const product = await Product.findById(productID)
        .populate({
            path: 'category',
            select: 'name'
        });

    checkResource(product, 'product', '00001');

    return product;
}

/**
 * Get product by url key
 * @param {string} urlKey
 * @returns <Promise> {Product}
 */
const getProductByKey = async function (urlKey) {
    const product = await this.findOne({ urlKey: urlKey })
        .populate({
            path: 'category',
            select: 'name'
        });

    checkResource(product, 'product', '00002');

    return product;
};


module.exports = {
    getProductByID,
    getProductByKey
}
