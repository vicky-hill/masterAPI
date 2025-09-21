import { Request, Response, NextFunction } from 'express'
import * as Image from './images.functions'

export const getImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = await Image.getImages();
        res.json(images);
    } catch (err) {
        next(err);
    }
}

export const getImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageId } = req.params;

        const image = await Image.getImage(imageId);
        res.json(image);
    } catch (err) {
        next(err);
    }
}

export const createImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = await Image.createImage(req.body);
        res.json(image);    
    } catch (err) {
        next(err);
    }
}

export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageId } = req.params;

        const image = await Image.updateImage(req.body, imageId);
        res.json(image);    
    } catch (err) {
        next(err);
    }
}

export const deleteImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageId } = req.params;

        const image = await Image.deleteImage(imageId);
        res.json(image);    
    } catch (err) {
        next(err);
    }
}
