const Product = require('./products.model')
const throwError = require('../../../utils/throwError')

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

    !product && throwError(`Could not find product by ID: ${productID}`);
    
    return product;
}

/**
 * Get product by url key
 * @param {string} urlKey
 * @returns <Promise> {Product}
 */
const getProductByKey = async function (urlKey) {
    const product = await Product.findOne({ urlKey: urlKey })
        .populate({
            path: 'category',
            select: 'name'
        });

        !product && throwError(`Could not find product by url key: ${urlKey}`); 

    return product;
};


module.exports = {
    getProductByID,
    getProductByKey
}
