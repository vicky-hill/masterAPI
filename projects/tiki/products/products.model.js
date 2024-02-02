const mongoose = require('mongoose');
const Err = require('../../../utils/errorHandler');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sort: {
        type: Number, 
    },
    status: {
        type: String,
        enum: ['active', 'inactive'] 
    },
    urlKey: {
        type: String,
        unique: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'TIKI_Category',
        required: true
    }
}, {
    timestamps: true
})

/**
 * Get product by ID
 * @param {objectId} productID
 * @returns {Product}
 */
ProductSchema.statics.getProductByID = async function (productID) {
    const product = await this.findById(productID)
        .populate({
            path: 'category',
            select: 'name'
        });

    if (!product) {
        throw new Err("Product not found", "Product could not be found", 404)
    }

    return product;
};

/**
 * Get product by url key
 * @param {string} urlKey
 * @returns {Product}
 */
ProductSchema.statics.getProductByKey = async function (urlKey) {
    const product = await this.findOne({ urlKey: urlKey })
        .populate({
            path: 'category',
            select: 'name'
        });

    if (!product) {
        throw new Err("Product not found", "Product could not be found", 404)
    }

    return product;
};

module.exports = mongoose.model('TIKI_Product', ProductSchema);