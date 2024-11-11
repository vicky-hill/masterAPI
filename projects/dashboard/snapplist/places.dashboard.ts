import Place from '../../snapplist/places/places.model'
import { Request, Response, NextFunction } from 'express'
import { PlaceAttributes } from '../../../types/snapplist/attribute.types'  
import { CreatePlace, UpdatePlace } from '../../../types/snapplist/payload.types'
import throwError from '../../../utils/throwError'

export const getPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const places: PlaceAttributes[] = await Place.find();
        res.json(places);
    } catch (err: any) {
        err.ctrl = getPlaces;
        next(err);
    }
}

export const getPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { placeId } = req.params;

        const place: PlaceAttributes | null = await Place.findById(placeId);
        if (!place) return throwError('Place not found');
        
        res.json(place);
    } catch (err: any) {
        err.ctrl = getPlace;
        next(err);
    }
}

export const createPlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreatePlace;

        const place: PlaceAttributes | null = await Place.create(req.body);
        
        res.json(place);    
    } catch (err: any) {
        err.ctrl = createPlace;
        next(err);
    }
}

export const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdatePlace;

        const { placeId } = req.params;

        const updatedPlace: PlaceAttributes | null = await Place.findByIdAndUpdate(
            placeId, req.body, { new: true }
        );
    
        res.json(updatedPlace);    
    } catch (err: any) {
        err.ctrl = updatePlace;
        next(err);
    }
}

export const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { placeId } = req.params;

        const place = await Place.findByIdAndDelete(placeId);
        
        res.json(place);    
    } catch (err: any) {
        err.ctrl = deletePlace;
        next(err);
    }
}