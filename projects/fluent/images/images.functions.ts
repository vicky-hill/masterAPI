import { Image, ImageAttributes } from '../../../types/fluent/attribute.types'
import { CreateImage, UpdateImage } from '../../../types/fluent/payload.types'
import ImageModel from './images.model'

export const getImages = async () => {
    const imageInstances = await ImageModel.find().lean();

    const images = imageInstances.map(imageInstance => ({
        ...imageInstance
    }))

    return images as Image[];
}

export const getImage = async (imageId: string): Promise<any> => {
    const image = await ImageModel.findById(imageId).lean();

    if (!image) throw new Error('Image not found');

    return image as Image;
}

export const createImage = async (data: CreateImage) => {
    const imageInstance: ImageAttributes = await ImageModel.create({ ...data });
    const image = imageInstance.toObject();

    return image as Image;
}

export const updateImage = async (data: UpdateImage, imageId: string) => {
    const image = await ImageModel.findByIdAndUpdate(imageId, data, { new: true }).lean();

    if (!image) throw new Error('Image not found');

    return image as Image;
}

export const deleteImage = async (imageId: string) => {
    const image = await ImageModel.findByIdAndDelete(imageId).lean();

    if (!image) throw new Error('Image not found');

    return image as Image;
}