const Cart = require('./carts.model');
const User = require('../users/users.model');
const mongoose = require('mongoose');

/**
 * Add to cart
 * @header x-auth-token
 * @property {array} req.body.items [{ productID: string, quantity: number}]
 * @returns cart {}
 */
async function addToCart(req, res, next) {
    try {
        let cart = await Cart.findOne({ userID: req.userID });

        // If user doesn't have a cart yet, create new cart and save it to user
        if (!cart) {
            cart = await Cart.create({ userID: req.userID });
            await User.findByIdAndUpdate(req.userID, { cart: cart._id })
        }

        const newItems = req.body.items
            .filter(item => (
                !cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))

        const existingItems = req.body.items
            .filter(item => (
                cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))
            .map(item => (
                cart.items.find(cartItem => cartItem.productID.toString() === item.productID.toString())
            ))

        // Existing items: If item already exists in cart, up the quantity
        if (existingItems && existingItems.length) {
            for (let i = 0; i < existingItems.length; i++) {
                const reqItem = req.body.items.find(item => item.productID.toString() === existingItems[i].productID.toString());

                cart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id },
                    { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
            }
        }

        // New Items
        if (newItems && newItems.length) {
            cart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: newItems } }, { new: true });
        }

        res.status(200).json(cart);
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
        let cart = { items: [] };
        cart = await Cart.findOne({ userID: req.userID });

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}


/**
 * Add to guest cart
 * @property {array} req.body.items [{ productID: string, quantity: number}]
 * @property {string} req.body.cartID
 * @returns cart {}
 */
async function addToGuestCart(req, res, next) {
    try {
        let cart = { items: [] };
        const { cartID } = req.body;

        if (cartID) {
            cart = await Cart.findById(req.body.cartID);
        } else {
            cart = await Cart.create({});
        }

        const newItems = req.body.items
            .filter(item => (
                !cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))

        const existingItems = req.body.items
            .filter(item => (
                cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))
            .map(item => (
                cart.items.find(cartItem => cartItem.productID.toString() === item.productID.toString())
            ))

        // Existing items: If item already exists in cart, up the quantity
        if (existingItems && existingItems.length) {
            for (let i = 0; i < existingItems.length; i++) {
                const reqItem = req.body.items.find(item => item.productID.toString() === existingItems[i].productID.toString());

                cart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id },
                    { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
            }
        }

        // New Items
        if (newItems && newItems.length) {
            cart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: newItems } }, { new: true });
        }

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

/**
 * Get all carts
 * @returns carts []
 */
async function getAllCarts(req, res, next) {
    try {
        const carts = await Cart.find()
            .sort({ createdAt: -1 });
        res.status(200).json(carts);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    getAllCarts,
    addToGuestCart,
    addToCart,
    getCart
}

