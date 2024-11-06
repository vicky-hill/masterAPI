import fsqDevelopers from '@api/fsq-developers'
import { NextFunction, Request, Response } from 'express'
import {createPlace} from './places.utils'

// const Place = require('./places.model');

export const test = async (req: Request, res: Response, next: NextFunction) => {
    try {
        fsqDevelopers.auth('fsq3U4PqPc3XCDECkQ5eqr/+TqV0rxbhDSpPI9vEFcvs0K0=');
        const data: any = await fsqDevelopers.placeSearch({ query: 'Cocktail%20Bar', limit: 50, near: 'Los Angeles' });
        const places = data.data.results.map((result: any) => ({
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
            address: result.location.formatted_address
        }))

        const created = await createPlace(places[0])

        res.json(created);
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

// const createPlace = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const body = {
//             fsq_id: req.body.fsq_id,
//             name: req.body.name,
//             geo: {
//                 lat: req.body.geocodes.main.latitude,
//                 long:  req.body.geocodes.main.longitude,
//             },
//             location: {
//                 address: req.body.location.address,
//                 country: req.body.location.country,
//                 locality: req.body.location.locality,
//                 postcode: req.body.location.postcode,
//                 region: req.body.location.region
//             },
//             address: req.body.location.formatted_address
//         }

//         // const place = await Place.create(body);
        
//         res.json(body);
//     } catch (err) {
//         next(err);
//     }
// }