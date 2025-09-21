
import { CartAttributes, CartItemAttributes } from '../../../types/tiki/attribute.types'
import { AddItem } from '../../../types/tiki/payload.types'
import CartModel from './carts.model'

export const populateProduct = [{
    path: 'items.product',
    select: 'name image price images'
}, {
    path: 'user',
    select: 'email'
}]

export const addOneItem = async (item: AddItem, cart: CartAttributes) => {
    try {
        let updatedCart;

        const existingItem = cart.items && cart.items.find(existingItem =>
            existingItem.product._id === item.productId
        );

        if (existingItem) {
            updatedCart = await CartModel.findOneAndUpdate({ "_id": cart._id, "items._id": existingItem._id },
                { "$set": { "items.$.quantity": existingItem.quantity + item.quantity } }, { new: true }).populate(populateProduct);
        } else {
            updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $push: { items: { product: item.productId, quantity: item.quantity } } }, { new: true }).populate(populateProduct);
        }

        return updatedCart;
    } catch (err) {
        console.log(err);
    }
}

export const addMultipleItems = async (items: CartItemAttributes[], cart: CartAttributes) => {
    try {
        let updatedCart;

        if (items) {
            const newItems = items
                .filter((item) => (
                    !cart.items
                        .map(cartItem => cartItem.product._id.toString())
                        .includes(item.product.toString())
                ))

            const existingItems: any = items
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
                    const reqItem: any = items.find(item => item.product.toString() === existingItems[i].product._id.toString());

                    updatedCart = await CartModel.findOneAndUpdate({ "_id": cart._id, "items._id": existingItems[i]._id },
                        { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
                }
            }

            // New Items
            if (newItems && newItems.length) {
                updatedCart = await CartModel.findByIdAndUpdate(cart._id, { $push: { items: newItems } }, { new: true }).populate(populateProduct);
            }
        }

        return updatedCart;

    } catch (err) {
        console.log(err);
    }
}