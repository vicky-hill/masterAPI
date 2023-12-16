const Cart = require('./carts.model')
const User = require('../users/users.model')
const mongoose = require('mongoose')

exports.getCart = async (req) => {
    try {
        const user = req.user;
        const { cartID } = req.params;

        let cart;

        // CartID exists
        if (mongoose.Types.ObjectId.isValid(cartID)) {
            cart = await Cart.findById(cartID).populate(product);

            // User exists
        } else if (user) {

            const userCart = await Cart.findOne({ userID: user._id }).populate(product);

            if (!userCart) {
                cart = await Cart.create({ userID: user._id });
                await User.findByIdAndUpdate(user._id, { cart: cart._id });
            } else {
                cart = userCart;
            }

            // Create a new guest cart
        } else {
            cart = await Cart.create({});
        }

        return cart;
    } catch (err) {
        console.log(err);
    }
}