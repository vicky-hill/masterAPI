const sendError = require('../../../utils/sendError')
const Product = require('./products.model')
const validate = require('../utils/validation')

/**
 * Get products
 * @returns { data: products [] }
 */
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'category',
                select: 'name'
            });;

        res.json({
            data: products
        });
    } catch (err) {
        next(err)
    }
}

/**
 * Get product by ID
 * @param productID
 * @returns { data: product {} }
 */
const getProductByID = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await Product.getProductByID(productID);
        res.status(200).json({ data: product });
    } catch (err) {
        next(err);
    }
}

/**
 * Get product by url key
 * @param urlKey
 * @returns { data: product {} }
 */
const getProductByUrlKey = async (req, res, next) => {
    try {
        const { urlKey } = req.params;
        const product = await Product.getProductByKey(urlKey);
        res.status(200).json({ data: product });
    } catch (err) {
        next(err);
    }
}

/**
 * Create product
 * @property {string} req.body.name 
 * @property {string} req.body.shortDescription
 * @property {string} req.body.description
 * @property {string} req.body.image
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @returns { data: Product }
 */
const saveProduct = async (req, res, next) => {
    try {
        await validate.createProduct(req.body);
        const newProduct = await Product.create(req.body);
        const product = await Product.getProductByID(newProduct._id);
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Update product
 * @param productID
 * @property {string} req.body.name 
 * @property {string} req.body.shortDescription
 * @property {string} req.body.description
 * @property {string} req.body.image
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @returns product {}
 */
const updateProduct = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const updateProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true });

        if (!product) return sendError(next, 404, {
            error: `Product not found`
        });

        const product = await Product.getProductByID(updateProduct._id);

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete product
 * @param productID 
 * @returns {Product}
 */
const deleteProduct = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await Product.findByIdAndDelete(productID);

        if (!product) return sendError(next, 404, {
            error: `Product not found`
        });

        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getProducts,
    getProductByID,
    getProductByUrlKey,
    saveProduct,
    updateProduct,
    deleteProduct
}