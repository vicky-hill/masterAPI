const Product = require('./products.model');

/**
 * Get products
 * @returns [products]
 */
async function getProducts(req, res, next) {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (err) {
        next(err)
    }
}

/**
 * Get one product
 * @param id
 * @returns { product }
 */
async function getProduct(req, res, next) {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json(product);
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
 * @property {string} req.body.level
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @returns { product }
 */
async function saveProduct(req, res, next) {
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
 * @property {string} req.body.level
 * @property {string} req.body.category
 * @property {string} req.body.price
 * @returns { product }
 */
async function updateProduct(req, res, next) {
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
 * @returns { product }
 */
async function deleteProduct(req, res, next) {
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