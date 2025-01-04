import Cart from './cart.model'
import User from '../users/users.model'
import { AddToCart } from '../../../types/hotsauce/payload.types'
import { CartAttributes } from '../../../types/hotsauce/attribute.types'

export const addToCart = async (data: AddToCart, userId: string) => {
    const { items } = data
    let cart: CartAttributes | null = await Cart.findOne({ userID: userId });

    // If user doesn't have a cart yet, create new cart and save it to user
    if (!cart) {
        cart = await Cart.create({ userID: userId });
        await User.findByIdAndUpdate(userId, { cart: cart._id })
    }

    const newItems = items
        .filter(item => (
            !cart?.items.map(item => item.productID.toString()).includes(item.productID.toString())
        ))

    const existingItems: any = items
        .filter(item => (
            cart?.items.map(item => item.productID.toString()).includes(item.productID.toString())
        ))
        .map(item => (
            cart?.items.find(cartItem => cartItem.productID.toString() === item.productID.toString())
        ))

    // Existing items: If item already exists in cart, up the quantity
    if (existingItems && existingItems.length) {
        for (let i = 0; i < existingItems.length; i++) {
            const reqItem: any = items.find(item => item.productID.toString() === existingItems[i].productID.toString());

            cart = await Cart.findOneAndUpdate({ "_id": cart?._id, "items._id": existingItems[i]._id },
                { "$set": { "items.$.quantity": existingItems[i].quantity + reqItem.quantity } }, { new: true });
        }
    }

    // New Items
    if (newItems && newItems.length) {
        cart = await Cart.findByIdAndUpdate(cart?.id, { $push: { items: newItems } }, { new: true });
    }

    return cart;
}

export const getCart = async (userId: string) => {
    let cart: any = { items: [] };
    cart = await Cart.findOne({ userID: userId });

    return cart;
}