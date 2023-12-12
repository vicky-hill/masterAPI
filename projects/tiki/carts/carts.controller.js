const Cart = require('./carts.model')
const { addMultipleItems, addOneItem, getCart, product }  = require('./carts.utils')

/**
 * Add item to cart
 * @param cartID
 * @property req.body { productID, quantity }
 * @returns carts []
 */
async function addItem(req, res, next) {
    try {
        const item = req.body;

        let cart = await getCart(req);

        if (!cart) return res.status(400).json({ msg: 'Cart with the provided cartID does not exist'})
       
        cart = await addOneItem(item, cart);

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
async function convertCart(req, res, next) {
    try {
        const { cartID } = req.params;
        delete req.params.cartID;

        let guestCart = await Cart.findById(cartID);
        let userCart = await getCart(req);

        const items = guestCart && guestCart.items.map(({ product, quantity}) => ({
            product,
            quantity
        }))

        const cart = await addMultipleItems(items, userCart);
        
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

async function retrieveCart(req, res, next) {
    try { 
        const cart = await getCart(req);
        res.status(200).json(cart);
    } catch (err) {
        next(err);
    }
}

// /**
//  * Convert guest cart to user cart
//  * @header x-auth-token
//  * @property {array} req.body.items [{ productID: string, quantity: number}]
//  * @returns cart {}
//  */
// async function convertCart(req, res, next) {
//     try {
//         const { cartID } = req.params;

//         let cart = await Cart.findById(cartID);
//         await addMultipleItems(req.body.items, cart);
//         cart = await Cart.findByIdAndUpdate(cartID, { user: req.user._id }, { new: true })
        
//         res.status(200).json(cart);
//     } catch (err) {
//         next(err);
//     }
// }

/**
 * Get all carts
 * @returns carts []
 */
async function getAllCarts(req, res, next) {
    try {
        const carts = await Cart.find()
            .sort({ createdAt: -1 })
            .populate(product)
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
          ).populate(product);

        res.status(200).json(updatedCart);
    } catch (err) {
        next(err);
    }
}





module.exports = {
    addItem,
    removeItem,
    updateQuantity,
    // convertCart,
    getAllCarts,
    convertCart,
    retrieveCart
}

