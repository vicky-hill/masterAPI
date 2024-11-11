import mongoose from 'mongoose'
import { Request, Response, NextFunction } from 'express'


export const getCollections = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { project } = req.params;

        const collections = await mongoose.connection.db.listCollections().toArray();
        
        const collectionNames = collections
            .map((collection: any) => collection.name)
            .filter((collection: any) => collection.toLowerCase().includes(project))
            .map((collection: any) => collection.split('_')[1])

        res.json(collectionNames);
    } catch (err: any) {
        err.ctrl = getCollections;
        next(err);
    }
}