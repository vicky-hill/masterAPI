const Cart = require('./carts.model');
const User = require('../users/users.model');
const mongoose = require('mongoose');

/**
 * Add to cart
 * @header x-auth-token
 * @property {string} req.body.productID
 * @property {number} req.body.quantity
 * @property {array} req.body.items
 * @returns cart {}
 */
async function addToCart(req, res, next) {
    try {
        let updatedCart = {};
        let cart = await Cart.findOne({ userID: req.userID });
        let existingCartItem = await Cart.findOne({ 'items.productID': req.body.items[0].productID });

        // If user doesn't have a cart yet, create new cart and save it to user
        if (!cart) {
            cart = await Cart.create({ userID: req.userID });
            await User.findByIdAndUpdate(req.userID, { cart: cart._id})
        }

        // If item already exists in cart, up the quantity
        if (existingCartItem) {
            const item = existingCartItem.items.find(item => item.productID.toString() === req.body.items[0].productID);

            updatedCart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": item._id },
                { "$set": { "items.$.quantity": item.quantity + req.body.items[0].quantity } }, { new: true })

        } else {
            updatedCart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: req.body.items } }, { new: true });
        }

        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
        console.log(err)
    }
}

/**
 * Get current user cart
 * @header x-auth-token
 * @returns cart {}
 */

async function getCart(req, res, next) {
    try {
        let cart = await Cart.findOne({ userID: req.userID })

        if(!cart) {
            res.status(404).json({ msg: 'No cart found'});
        }

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addToCart,
    getCart
}

