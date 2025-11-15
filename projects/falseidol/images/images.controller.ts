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


export const importImages = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const images = await Image.importImages(req.body);
        res.json(images);
    } catch (err) {
        next(err);
    }
}
