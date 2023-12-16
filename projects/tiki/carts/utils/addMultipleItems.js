const Cart = require('./carts.model')

exports.addMultipleItems = async (items, cart) => {
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
