const Cart = require('./carts.model');
const mongoose = require('mongoose');

/**
 * Add to cart
 * @header x-auth-token
 * @property {string} req.body.productID
 * @property {number} req.body.quantity
 * @returns cart {}
 */
async function addToCart(req, res, next) {
    try {
        let updatedCart = {};
        let cart = await Cart.findOne({ userID: req.userID });
        let existingCartItem = await Cart.findOne({ 'items.productID': req.body.productID });

        // If user doesn't have a cart yet, create new cart
        if (!cart) {
            cart = await Cart.create({ userID: req.userID });
        }

        // If item already exists in cart, up the quantity
        if (existingCartItem) {
            const item = existingCartItem.items.find(item => item.productID.toString() === req.body.productID);

            updatedCart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": item._id },
                { "$set": { "items.$.quantity": item.quantity + req.body.quantity } }, { new: true })

        } else {
            updatedCart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: req.body } }, { new: true });
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

