const Product = require('./products.model')
const validate = require('../utils/validation')
const ImageKit = require('imagekit')
const checkResource = require('../../../utils/checkResource')
const utils = require('./products.utils')
const Category = require('../categories/categories.model')

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});


/**
 * Get products
 * @query search
 * @query category
 * @returns { data: [{Product}]}
 */
const getProducts = async (req, res, next) => {
    try {
        const { search, category } = req.query;

        const options = {};

        if (search) {
            options.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { short_description: { $regex: search, $options: 'i' } }
            ]
        }

        if (category) {
            options.category = category;
        }

        const products = await Product.find(options)
            .sort({ createdAt: -1 })
            .populate({
                path: 'category',
                select: 'name'
            });

        res.json({
            data: products
        });
    } catch (err) {
        err.errorCode = '00005'
        next(err);
    }
}

/**
 * Get category products
 * @param categoryName
 * @returns { data: [{Product}]}
 */
const getCategoryProducts = async (req, res, next) => {
    try {
        const { categoryName } = req.params;
        const name = categoryName
            .split("-")
            .map(word => `${word[0].toUpperCase()}${word.slice(1)}`)
            .join(" ")

        const category = await Category.findOne({ name });

        checkResource(category, 'category', '00021');

        const products = await Product.find({ category: category._id })
            .sort({ sort: 1 });

        res.json({ data: products });
    } catch (err) {
        err.errorCode = '00020'
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
        const product = await utils.getProductByID(productID);

        res.status(200).json(product);
    } catch (err) {
        err.errorCode = '00006'
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
        const product = await utils.getProductByKey(urlKey);
        res.status(200).json(product);
    } catch (err) {
        err.errorCode = '00007'
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

        const product = await utils.getProductByID(newProduct._id);
        res.status(201).json(product);
    } catch (err) {
        err.errorCode = '00008'
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

        checkResource(updateProduct, 'product', '00003');

        const product = await utils.getProductByID(updateProduct._id);

        res.status(200).json(product);
    } catch (err) {
        err.errorCode = '00009'
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

        checkResource(product, 'product', '00004');

        res.status(200).json(product)
    } catch (err) {
        err.errorCode = '00010'
        next(err);
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
        err.errorCode = '00011'
        next(err);
    }
}

/**
 * Sort products
 * @property req.body [{ _id, sort }]
 * @returns { data: [{ Product }] }
 */
const sortProducts = async (req, res, next) => {
    try {
        await validate.sortProducts(req.body);

        const data = [];

        for (const product of req.body) {
            const { _id, sort } = product;
            const updatedProduct = await Product.findByIdAndUpdate(_id, { sort }, { new: true });
            data.push(updatedProduct);
        }

        res.json({ data });
    } catch (err) {
        err.errorCode = '00012'
        next(err);
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
        err.errorCode = '00013'
        next(err);
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
    checkURLKey,
    sortProducts,
    getCategoryProducts
}