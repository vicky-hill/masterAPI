const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        ref: 'TIKI_Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});



module.exports = mongoose.model('TIKI_Cart', CartSchema);