const Cart = require('./carts.model')
const utils = require('./carts.utils')

/**
 * Add item to cart
 * @param cartID
 * @property req.body { productID, quantity }
 * @returns carts []
 */
const addItem = async (req, res, next) => {
    try {
        const item = req.body;

        let cart = await utils.getCart(req);

        if (!cart) return res.status(400).json({ msg: 'Cart with the provided cartID does not exist'})
       
        cart = await utils.addOneItem(item, cart);

        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

/**
 * Merge guest cart
 * @header x-auth-token
 * @param cartID 
 * @returns cart {}
 */
const convertCart = async (req, res, next) => {
    try {
        const { cartID } = req.params;
        delete req.params.cartID;

        let guestCart = await Cart.findById(cartID);
        let userCart = utils.getCart(req);

        const items = guestCart && guestCart.items.map(({ product, quantity}) => ({
            product,
            quantity
        }))

        const cart = await utils.addMultipleItems(items, userCart);
        
        await Cart.findByIdAndDelete(cartID);

        res.status(200).json(cart);
    } catch (err) {
        next(err);
        console.log(err)
    }
}

/**
 * Get current user cart
 * @header x-auth-token - optional
 * @param cartID - optional
 * @returns cart {}
 */
const retrieveCart = async (req, res, next) => {
    try { 
        const cart = await utils.getCart(req);
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

/**
 * Get all carts
 * @returns carts []
 */
const getAllCarts = async (req, res, next) => {
    try {
        const carts = await Cart.find()
            .sort({ createdAt: -1 })
            .populate(utils.product)
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
const updateQuantity = async (req, res, next) => {
    try {

        const cart = await Cart.findOneAndUpdate({ "items._id": req.params.cartItemID },
            { "$set": { "items.$.quantity": req.body.quantity } }, { new: true }).populate('items.product');
  
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
const removeItem = async (req, res, next) => {
    try {
        const { cartItemID } = req.params;
      
        const cart = await Cart.findOne({ "items._id": cartItemID });
        
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $pull: { items: { _id: cartItemID } } },
            { new: true }
          ).populate(utils.product);

        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    addItem,
    removeItem,
    updateQuantity,
    getAllCarts,
    convertCart,
    retrieveCart
}

