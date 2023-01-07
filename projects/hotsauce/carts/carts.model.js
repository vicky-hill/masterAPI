const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        ref: 'HOTSAUCE_Proudct',
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
        required: true
    },
    items: [CartItemSchema]
}, {
    timestamps: true
});



module.exports = mongoose.model('HOTSAUCE_Cart', CartSchema);