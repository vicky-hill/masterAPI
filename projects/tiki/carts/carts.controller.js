const Cart = require('./carts.model')
const User = require('../users/users.model')
const { addItemsToCart }  = require('./carts.utils')

/**
 * Add to cart
 * @header x-auth-token
 * @property {array} req.body.items [{ productID: string, quantity: number}]
 * @returns cart {}
 */
async function addToCart(req, res, next) {
    try {
        let cart = await Cart.findOne({ userID: req.userID });

        if (!cart) {
            cart = await Cart.create({ userID: req.userID });
            await User.findByIdAndUpdate(req.userID, { cart: cart._id })
        }

        cart = await addItemsToCart(req.body.items, cart);

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

        cart = await addItemsToCart(req.body.items, cart);

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

/**
 * Convert guest cart to user cart
 * @header x-auth-token
 * @property {array} req.body.items [{ productID: string, quantity: number}]
 * @returns cart {}
 */
async function convertCart(req, res, next) {
    try {
        let cart = await Cart.findById(req.params.cartID);
        await addItemsToCart(req.body.items, cart);
        cart = await Cart.findByIdAndUpdate(req.params.cartID, { userID: req.user._id }, { new: true })
        
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

/**
 * Get guest cart
 * @returns cart {}
 */
async function getGuestCart(req, res, next) {
    try {
        const cart = await Cart.findById(req.params.cartID);
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

/**
 * Update cart item quantity
 * @param cartItemID
 * @property req.body.quantity
 * @returns carts []
 */
async function updateQuantity(req, res, next) {
    try {

        const cart = await Cart.findOneAndUpdate({ "items._id": req.params.cartItemID },
            { "$set": { "items.$.quantity": req.body.quantity } }, { new: true });
  
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}


/**
 * Remove item from cart
 * @param cartItemID
 * @returns carts []
 */
async function removeItem(req, res, next) {
    try {
        const { cartItemID } = req.params;
      
        const cart = await Cart.findOne({ "items._id": cartItemID });
        
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $pull: { items: { _id: cartItemID } } },
            { new: true }
          );

        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
}





module.exports = {
    removeItem,
    updateQuantity,
    convertCart,
    getGuestCart,
    getAllCarts,
    addToGuestCart,
    addToCart,
    getCart
}

