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
 * @returns product {}
 */
const getProductByID = async (req, res, next) => {
    try {
        const { productID } = req.params;
        const product = await Product.getProductByID(productID);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Get product by url key
 * @param urlKey
 * @returns product {}
 */
const getProductByUrlKey = async (req, res, next) => {
    try {
        const { urlKey } = req.params;
        const product = await Product.getProductByKey(urlKey);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Create product
 * @property {string} req.body.name 
 * @property {string} req.body.shortDescription
 * @property {string} req.body.description
 * @property {array} req.body.images [url]
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @property {string} req.body.urlKey
 * @returns product {}
 */
const saveProduct = async (req, res, next) => {
    try {
        await validate.createProduct(req.body);
        const count = await Product.countDocuments({ category: req.body.category });
        const images = req.body.images.map((img, i) => ({
            url: img,
            sort: i + 1
        }))
       
        const newProduct = await Product.create({
            ...req.body,
            status: 'active',
            sort: count + 1,
            images
        });

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
 * @property {array} req.body.images [url]
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @property {string} req.body.urlKey
 * @returns product {}
 */
const updateProduct = async (req, res, next) => {
    try {
        const { productID } = req.params;
        
        if (req.body.images && req.body.images.length) {
            req.body.images = req.body.images.map((img, i) => {
                if (typeof(img) === 'string') {
                    return { url: img, sort: i + 1 }
                } else {
                    return { url: img.url, sort: i + 1, _id: img._id}
                }
            })
        }

        const updateProduct = await Product.findByIdAndUpdate(productID, req.body, { new: true });

        if (!updateProduct) return sendError(next, 404, {
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