const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        ref: 'HOTSAUCE_Proudct'
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const CartSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Schema.ObjectId,
        ref: 'HOTSAUCE_User'
    },
    items: [CartItemSchema]
});



module.exports = mongoose.model('HOTSAUCE_Cart', CartSchema);