const Cart = require('./carts.model')
const User = require('../users/users.model')
const mongoose = require('mongoose')

const product = {
    path: 'items.product',
}

const getCart = async (req) => {
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

const addMultipleItems = async (items, cart) => {
    try {
        if (items) {
            const newItems = items
                .filter(item => (
                    !cart.items
                        .map(cartItem => cartItem.product._id.toString())
                        .includes(item.product.toString())
                ))

            const existingItems = items
                .filter(item => (
                    cart.items
                        .map(cartItem => cartItem.product._id.toString())
                        .includes(item.product.toString())
                ))
                .map(item => (
                    cart.items
                        .find(cartItem => cartItem.product._id.toString() === item.product.toString())
                ))

            // Existing items: If item already exists in cart, up the quantity
            if (existingItems && existingItems.length) {
                for (let i = 0; i < existingItems.length; i++) {
                    const reqItem = items.find(item => item.product.toString() === existingItems[i].product._id.toString());

                    cart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id },
                        { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
                }
            }

            // New Items
            if (newItems && newItems.length) {
                cart = await Cart.findByIdAndUpdate(cart._id, { $push: { items: newItems } }, { new: true }).populate(product);
            }
        }

        return cart;

    } catch (err) {
        console.log(err);
    }
}

const addOneItem = async (item, cart) => {
    try {
        const existingItem = cart.items && cart.items.find(existingItem =>
            existingItem.product._id.toString() === item.productID
        );

        if (existingItem) {
            cart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": existingItem._id },
                { "$set": { "items.$.quantity": existingItem.quantity + item.quantity } }, { new: true }).populate(product);
        } else {
            cart = await Cart.findByIdAndUpdate(cart._id, { $push: { items: { product: item.productID, quantity: item.quantity } } }, { new: true }).populate(product);
        }

        return cart;

    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    product,
    getCart,
    addMultipleItems,
    addOneItem
}