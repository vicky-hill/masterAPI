const Cart = require('./carts.model');

const addItemsToCart = async (items, cart) => {
    try {
        const newItems = items
            .filter(item => (
                !cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))

        const existingItems = items
            .filter(item => (
                cart.items.map(item => item.productID.toString()).includes(item.productID.toString())
            ))
            .map(item => (
                cart.items.find(cartItem => cartItem.productID.toString() === item.productID.toString())
            ))

        // Existing items: If item already exists in cart, up the quantity
        if (existingItems && existingItems.length) {
            for (let i = 0; i < existingItems.length; i++) {
                const reqItem = items.find(item => item.productID.toString() === existingItems[i].productID.toString());

                cart = await Cart.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id },
                    { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
            }
        }

        // New Items
        if (newItems && newItems.length) {
            cart = await Cart.findByIdAndUpdate(cart.id, { $push: { items: newItems } }, { new: true });
        }

        return cart;

    } catch (err) {
        console.log(err);
    }
}

module.exports = { 
    addItemsToCart
}