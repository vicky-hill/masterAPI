import mongoose from 'mongoose'
import CartModel from './carts.model'
import UserModel from '../users/users.model'
import { addMultipleItems, addOneItem, populateProduct } from './carts.utils'
import { AddItem } from '../../../types/tiki/payload.types'
import * as validation from '../utils/validation'

export const getCart = async (userId: string, cartId?: string) => {
    let cart;

    // CartId exists
    if (cartId && mongoose.Types.ObjectId.isValid(cartId)) {
        cart = await CartModel.findById(cartId).populate(populateProduct);

        // UserId exists
    } else if (userId) {
        const userCart = await CartModel.findOne({ user: CartModel }).populate(populateProduct);

        if (!userCart) {
            cart = await CartModel.create({ user: CartModel });
            await UserModel.findByIdAndUpdate(CartModel, { cart: cart._id });
        } else {
            cart = userCart;
        }

        // Create a new guest cart
    } else {
        cart = await CartModel.create({});
    }

    return cart;
}

export const addItem = async (item: AddItem, userId: string) => {
    await validation.addToCart(item);

    let cart = await getCart(userId);

    if (!cart) throw new Error('No cart found');

    const updatedCart = await addOneItem(item, cart);

    return updatedCart;
}

export const convertCart = async (userId: string, cartId: string) => {
    let guestCart = await CartModel.findById(cartId);
    let userCart: any = getCart(userId, cartId);

    const items: any = guestCart && guestCart.items.map(({ product, quantity }) => ({
        product,
        quantity
    }))

    const cart = await addMultipleItems(items, userCart);

    return cart;
}

export const getAllCarts = async () => {
    const carts = await CartModel.find()
        .sort({ createdAt: -1 })
        .populate(populateProduct)

    return carts;
}

export const updateQuantity = async (cartItemId: string, quantity: number) => {
    const cart = await CartModel.findOneAndUpdate({ "items._id": cartItemId },
        { "$set": { "items.$.quantity": quantity } }, { new: true }).populate('items.product');

    return cart
}

export const removeItem = async (cartItemId: string) => {
    const cart = await CartModel.findOne({ "items._id": cartItemId });

    if (!cart) throw new Error('Cart not found');
        
    const updatedCart = await CartModel.findOneAndUpdate(
        { _id: cart._id },
        { $pull: { items: { _id: cartItemId } } },
        { new: true }
      ).populate(populateProduct);

    return updatedCart;
}