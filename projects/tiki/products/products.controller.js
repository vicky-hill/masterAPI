const Product = require('./products.model');

/**
 * Get products
 * @returns { data: products [] }
 */
const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 });

        res.json({
            data: products
        });
    } catch (err) {
        next(err)
    }
}

/**
 * Get one product
 * @param id
 * @returns { data: product {} }
 */
const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({
            data: product
        });
    } catch (err) {
        next(err);
    }
}

/**
 * Save product
 * @property {string} req.body.name 
 * @property {string} req.body.shortDescription
 * @property {string} req.body.description
 * @property {string} req.body.image
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @returns product {}
 */
const saveProduct = async (req, res, next) => {
    try {
        const newProduct = await Product.create(req.body);
        const product = await Product.findById(newProduct._id);

        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Update product
 * @param id
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
        const updateProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updateProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const product = await Product.findById(updateProduct._id);

        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
}

/**
 * Delete product
 * @param id  
 * @returns product {}
 */
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json(product)
    } catch (err) {
        next(err)
    }
}


module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}