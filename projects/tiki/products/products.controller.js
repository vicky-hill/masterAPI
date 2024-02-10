const sendError = require('../../../utils/sendError')
const Product = require('./products.model')
const validate = require('../utils/validation')
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});


/**
 * Get products
 * @param search
 * @returns { data: [{Product}]}
 */
const getProducts = async (req, res, next) => {
    try {
        const { search } = req.query;

        const options = {};

        if (search) {
            options.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }, 
                { short_description: { $regex: search, $options: 'i' } }
            ]
        }

        const products = await Product.find(options)
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
 * @returns {Product}
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
 * @returns {Product}
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
 * @property {array} req.body.images [{ url }]
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @property {string} req.body.urlKey
 * @returns {Product}
 */
const saveProduct = async (req, res, next) => {
    try {
        await validate.createProduct(req.body);
        const count = await Product.countDocuments({ category: req.body.category });
        const images = req.body.images.map(({ url }, i) => ({
            url,
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
 * @property {array}  req.body.images [{ url }]
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @property {string} req.body.urlKey
 * @returns {Product}
 */
const updateProduct = async (req, res, next) => {
    try {
        const { productID } = req.params;

        if (req.body.images && req.body.images.length) {
            req.body.images = req.body.images.map(({ _id, url, sort }, i) => {
                return _id ?
                    { url, sort: i + 1, _id } :
                    { url, sort: i + 1 }
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

/**
 * Check URL Key
 * @params urlKey
 * @returns { exists: Boolean }
 */
const checkURLKey = async (req, res) => {
    try {
        const { urlKey } = req.params;

        const product = await Product.findOne({ urlKey });

        res.json({ exists: product ? true : false });
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

/**
 * Image Kit Auth
 * @returns { token, expire, signature }
 */
const imageKitAuth = async (req, res) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

module.exports = {
    getProducts,
    getProductByID,
    getProductByUrlKey,
    saveProduct,
    updateProduct,
    deleteProduct,
    imageKitAuth,
    checkURLKey
}