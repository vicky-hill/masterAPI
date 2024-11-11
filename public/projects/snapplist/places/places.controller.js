"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlace = exports.deleteAllPlaces = exports.getPlaces = exports.test = void 0;
const fsq_developers_1 = __importDefault(require("@api/fsq-developers"));
const places_model_1 = __importDefault(require("./places.model"));
const neighborhoods_model_1 = __importDefault(require("../neighborhoods/neighborhoods.model"));
const throwError_1 = __importDefault(require("../../../utils/throwError"));
const categories_model_1 = __importDefault(require("../categories/categories.model"));
// const Place = require('./places.model');
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { term } = req.query;
        const query = JSON.stringify(term);
        fsq_developers_1.default.auth('fsq3U4PqPc3XCDECkQ5eqr/+TqV0rxbhDSpPI9vEFcvs0K0=');
        const data = yield fsq_developers_1.default.placeSearch({
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
        const neighborhood = yield neighborhoods_model_1.default.findById("673152221ef36580208f98dc");
        if (!neighborhood)
            return (0, throwError_1.default)('No neighborhood found');
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
        const categories = [];
        result.categories.forEach((category) => {
            const exists = categories.find((c) => c.fsq_id === category.id);
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
                });
            }
        });
        // Upsert categories
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            yield categories_model_1.default.updateOne({ fsq_id: category.fsq_id }, { $set: category }, { upsert: true });
        }
        // Get mongo category Ids
        const dbCategories = yield categories_model_1.default.find({ fsq_id: result.categories.map((category) => category.id) });
        const categoryIds = dbCategories.map((category) => category._id);
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
            photos: result.photos.map((photo) => ({
                fsq_id: photo.id,
                prefix: photo.prefix,
                suffix: photo.suffix,
                width: photo.width,
                length: photo.length
            }))
        };
        const upsertPlace = yield places_model_1.default.updateOne({ fsq_id: place.fsq_id }, { $set: place }, { upsert: true });
        // Add new place to neighborhood
        if (upsertPlace.upsertedCount || upsertPlace.matchedCount) {
            const upsertedPlace = yield places_model_1.default.findOne({ fsq_id: place.fsq_id });
            yield neighborhoods_model_1.default.findByIdAndUpdate(neighborhood._id, {
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
    }
    catch (err) {
        err.ctrl = exports.test;
        next(err);
    }
});
exports.test = test;
const getPhotos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // fsqDevelopers.auth('fsq3nik7c+GzEF6ruflZ3nFzKGT48Kk09IlyVAUGMDG2Twk=');
        // const data = await fsqDevelopers.placePhotos({ fsq_id: req.params.id })
        // res.json(data)
    }
    catch (err) {
        err.ctrl = getPhotos;
        next(err);
    }
});
const getPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const places = yield places_model_1.default.find().populate({
            path: 'neighborhood',
            select: 'name'
        });
        res.json(places);
    }
    catch (err) {
        err.ctrl = exports.getPlaces;
        next(err);
    }
});
exports.getPlaces = getPlaces;
const deleteAllPlaces = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield places_model_1.default.deleteMany({});
        res.json('deleted');
    }
    catch (err) {
        err.ctrl = exports.getPlaces;
        next(err);
    }
});
exports.deleteAllPlaces = deleteAllPlaces;
const deletePlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { placeId } = req.params;
        const place = yield places_model_1.default.findByIdAndDelete(placeId);
        yield neighborhoods_model_1.default.updateOne({ _id: place === null || place === void 0 ? void 0 : place.neighborhood }, { $pull: { places: placeId, fsq_ids: place === null || place === void 0 ? void 0 : place.fsq_id } });
        res.json(place);
    }
    catch (err) {
        err.ctrl = exports.deletePlace;
        next(err);
    }
});
exports.deletePlace = deletePlace;
