import CategoryModel from './categories.model'
import * as validate from '../utils/validation'


export const getCategories = async () => {
    const categories = await CategoryModel.find()
        .sort({ sort: 1 })
        .populate({
            path: 'products',
            select: '_id name short_description price urlKey image sort',
            options: { sort: { sort: 1 } }
        });

    return categories;
}


export const getCategoryById = async (categoryId: any) => {
    const category = await CategoryModel.findById(categoryId).populate({
        path: 'products',
        select: '_id name short_description price urlKey image images sort',
        options: { sort: { sort: 1 } }
    });

    if (!category) throw new Error('Category not found');

    return category;
}


export const createCategory = async (data: any) => {
    await validate.createCategory(data);

    const newCategory = await CategoryModel.create(data);
    const category = await getCategoryById(newCategory._id);

    return category;
}


export const updateCategory = async (data: any, categoryId: string) => {
    await validate.updateCategory(data);

    const updateCategory = await CategoryModel.findByIdAndUpdate(categoryId, data, { new: true });

    if (!updateCategory) throw new Error('Category not found');

    const category = await getCategoryById(updateCategory._id);
    
    return category;
}


export const deleteCategory = async (categoryId: string) => {
    const category = await CategoryModel.findByIdAndDelete(categoryId);

    if (!category) throw new Error('Category not found');

    return category;
}


export const sortCategories = async (data: any) => {
    await validate.sortCategories(data);

    const sorted = [];

    for (const category of data) {
        const { _id, sort } = category;
        const updatedCategory = await CategoryModel.findByIdAndUpdate(_id, { sort }, { new: true });
        sorted.push(updatedCategory);
    }

    return sorted;
}