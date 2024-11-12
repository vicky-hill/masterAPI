import fsqDevelopers from '@api/fsq-developers'
import { NextFunction, Request, Response } from 'express'
import { NeighborhoodAttributes, PlaceAttributes } from '../../../types/snapplist/attribute.types'
import Place from './places.model'
import Neighborhood from '../neighborhoods/neighborhoods.model'
import User from '../users/users.model'
import throwError from '../../../utils/throwError'
import Category from '../categories/categories.model'

// const Place = require('./places.model');

export const test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { term } = req.query;

        const query = JSON.stringify(term);

        fsqDevelopers.auth('fsq3U4PqPc3XCDECkQ5eqr/+TqV0rxbhDSpPI9vEFcvs0K0=');
        const data: any = await fsqDevelopers.placeSearch({
            query,
            limit: 1,
            near: 'Los Angeles',
            fields: 'fsq_id,name,location,rating,hours,description,menu,name,photos,price,rating,geocodes,categories'
        });



        // const data: any = await fsqDevelopers.placeDetails({ 
        //     fsq_id,
        //     fields: 'name,location,rating,hours,description,menu,name,photos,price,rating'
        //  })

        // const data = await fsqDevelopers.placeSearch({
        //     near: 'Los Angeles',
        //     query: 'chinatown',
        //     limit: 10, // Number of results to return
        //     fields: 'name,location,rating,hours,description,menu,name,photos,price,rating' // Request rich data fields
        //   })

        // Arts District
        const neighborhood: NeighborhoodAttributes | null = await Neighborhood.findById("673152221ef36580208f98dc");

        if (!neighborhood) return throwError('No neighborhood found')




        // Compile places payload
        // const places = data.data.results.map((result: any) => ({
        //     fsq_id: result.fsq_id,
        //     name: result.name,
        //     geo: {
        //         lat: result.geocodes.main.latitude,
        //         long: result.geocodes.main.longitude
        //     },
        //     location: {
        //         address: result.location.address,
        //         country: result.location.country,
        //         locality: result.location.locality,
        //         postcode: result.location.postcode,
        //         region: result.location.region
        //     },
        //     address: result.location.formatted_address,
        //     // neighborhood: neighborhood._id,
        //     price: result.price,
        //     rating: result.rating,
        //     photos: result.photos.map((photo: any) => ({
        //         fsq_id: photo.id,
        //         prefix: photo.prefix,
        //         suffix: photo.suffix,
        //         width: photo.width,
        //         length: photo.length
        //     }))
        // }))


        const result = data.data.results[0];

        const categories: any = []

        result.categories.forEach((category: any) => {
            const exists = categories.find((c: any) => c.fsq_id === category.id);
            if (!exists) {
                categories.push({
                    fsq_id: category.id,
                    name: category.name,
                    short_name: category.short_name,
                    plural_name: category.plural_name,
                    icon: {
                        prefix: category.icon.prefix,
                        suffix: category.icon.suffix,
                    }
                })
            }
        })

        // Upsert categories
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];

            await Category.updateOne(
                { fsq_id: category.fsq_id },
                { $set: category },
                { upsert: true }
            )
        }

        // Get mongo category Ids
        const dbCategories: any = await Category.find({ fsq_id: result.categories.map((category: any) => category.id) });
        const categoryIds = dbCategories.map((category: any) => category._id)

        const place = {
            fsq_id: result.fsq_id,
            name: result.name,
            geo: {
                lat: result.geocodes.main.latitude,
                long: result.geocodes.main.longitude
            },
            location: {
                address: result.location.address,
                country: result.location.country,
                locality: result.location.locality,
                postcode: result.location.postcode,
                region: result.location.region
            },
            address: result.location.formatted_address,
            neighborhood: neighborhood._id,
            price: result.price,
            rating: result.rating,
            categories: categoryIds,
            photos: result.photos.map((photo: any) => ({
                fsq_id: photo.id,
                prefix: photo.prefix,
                suffix: photo.suffix,
                width: photo.width,
                length: photo.length
            }))
        }

        const upsertPlace: any = await Place.updateOne(
            { fsq_id: place.fsq_id },
            { $set: place },
            { upsert: true }
        )

        // Add new place to neighborhood
        if (upsertPlace.upsertedCount || upsertPlace.matchedCount) {
            const upsertedPlace: any = await Place.findOne({ fsq_id: place.fsq_id });

            await Neighborhood.findByIdAndUpdate(neighborhood._id,
                {
                    $addToSet: {
                        fsq_ids: place.fsq_id,
                        places: upsertedPlace._id
                    },
                });
        }


        // Upsert places
        // for (let i = 0; i < places.length; i++) {
        //     const place = places[i];

        //     const upsertPlace: any = await Place.updateOne(
        //         { fsq_id: place.fsq_id },
        //         { $set: place },
        //         { upsert: true }
        //     )

        //     // Add new place to neighborhood
        //     if (upsertPlace.upsertedCount) {
        //         const upsertedPlace: any = await Place.findOne({ fsq_id: place.fsq_id });

        //         // await Neighborhood.findByIdAndUpdate(neighborhood._id,
        //         //     {
        //         //         $addToSet: {
        //         //             fsq_ids: place.fsq_id,
        //         //             places: upsertedPlace._id
        //         //         },
        //         //     });
        //     }
        // }

        res.json(result.name);
    } catch (err: any) {
        err.ctrl = test;
        next(err);
    }
}

const getPhotos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // fsqDevelopers.auth('fsq3nik7c+GzEF6ruflZ3nFzKGT48Kk09IlyVAUGMDG2Twk=');
        // const data = await fsqDevelopers.placePhotos({ fsq_id: req.params.id })

        // res.json(data)
    } catch (err: any) {
        err.ctrl = getPhotos;
        next(err);
    }
}

export const getPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const places: PlaceAttributes[] = await Place.find().populate({
            path: 'neighborhood',
            select: 'name'
        });
        res.json(places);
    } catch (err: any) {
        err.ctrl = getPlaces;
        next(err);
    }
}

export const deleteAllPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Place.deleteMany({});
        res.json('deleted');
    } catch (err: any) {
        err.ctrl = getPlaces;
        next(err);
    }
}

export const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { placeId } = req.params;

        const place: PlaceAttributes | null = await Place.findByIdAndDelete(placeId);

        await Neighborhood.updateOne(
            { _id: place?.neighborhood },
            { $pull: { places: placeId, fsq_ids: place?.fsq_id } }
        )

        res.json(place);
    } catch (err: any) {
        err.ctrl = deletePlace;
        next(err);
    }
}


export const addPlaceToUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { placeId } = req.params;

        const place: PlaceAttributes | null = await Place.findByIdAndDelete(placeId);

        await User.updateOne(
            { _id: place?.neighborhood },
            { $pull: { places: placeId, fsq_ids: place?.fsq_id } }
        )

        res.json(place);
    } catch (err: any) {
        err.ctrl = addPlaceToUserList;
        next(err);
    }
}