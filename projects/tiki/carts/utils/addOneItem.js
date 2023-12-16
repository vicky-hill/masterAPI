const Cart = require('./carts.model')

exports.addOneItem = async (item, cart) => {
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