const mongoose = require('mongoose');
const Err = require('../../../utils/errorHandler');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    shortDesc: {
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
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'TIKI_Category',
        required: true
    },
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

module.exports = mongoose.model('TIKI_Product', ProductSchema);