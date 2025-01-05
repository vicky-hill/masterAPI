import { CreateProduct, UpdateProduct } from '../../../types/hotsauce/payload.types';
import throwError from '../../../utils/throwError';
import Product from './products.model'

export const getProducts = async () => {
    const products = await Product.find()
        .sort({ createdAt: -1 });

    return products;
}

export const getProduct = async (productId: string) => {
    const product = await Product.findById(productId);

    if (!product) throwError('Product not found');

    return product;
}

export const createProduct = async (data: CreateProduct) => {
    const newProduct = await Product.create(data);
    const product = await Product.findById(newProduct._id);

    return product;
}

export const updateProduct = async (data: UpdateProduct, productId: string) => {
    const updateProduct = await Product.findByIdAndUpdate(productId, data, { new: true });

    if (!updateProduct) return throwError('Product not found');

    const product = await Product.findById(updateProduct._id);

    return product;
}

export const deleteProduct = async (productId: string) => {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) throwError('Product not found');

    return product;
}