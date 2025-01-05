import Neighborhood from '../../snapplist/neighborhoods/neighborhoods.model'
import { Request, Response, NextFunction } from 'express'
import { NeighborhoodAttributes } from '../../../types/snapplist/attribute.types'  
import { CreateNeighborhood, UpdateNeighborhood } from '../../../types/snapplist/payload.types'
import throwError from '../../../utils/throwError'

export const getNeighborhoods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const neighborhoods: NeighborhoodAttributes[] = await Neighborhood.find();
        res.json(neighborhoods);
    } catch (err: any) {
        err.ctrl = getNeighborhoods;
        next(err);
    }
}

export const getNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { neighborhoodId } = req.params;

        const neighborhood: NeighborhoodAttributes | null = await Neighborhood.findById(neighborhoodId);
        if (!neighborhood) return throwError('Neighborhood not found');
        
        res.json(neighborhood);
    } catch (err: any) {
        err.ctrl = getNeighborhood;
        next(err);
    }
}

export const createNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as CreateNeighborhood;

        const neighborhood: NeighborhoodAttributes | null = await Neighborhood.create(req.body);
        
        res.json(neighborhood);    
    } catch (err: any) {
        err.ctrl = createNeighborhood;
        next(err);
    }
}

export const updateNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        req.body as UpdateNeighborhood;

        const { neighborhoodId } = req.params;

        const updatedNeighborhood: NeighborhoodAttributes | null = await Neighborhood.findByIdAndUpdate(
            neighborhoodId, req.body, { new: true }
        );
    
        res.json(updatedNeighborhood);    
    } catch (err: any) {
        err.ctrl = updateNeighborhood;
        next(err);
    }
}

export const deleteNeighborhood = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { neighborhoodId } = req.params;

        const neighborhood = await Neighborhood.findByIdAndDelete(neighborhoodId);
        
        res.json(neighborhood);    
    } catch (err: any) {
        err.ctrl = deleteNeighborhood;
        next(err);
    }
}