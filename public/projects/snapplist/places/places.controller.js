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
exports.test = void 0;
const fsq_developers_1 = __importDefault(require("@api/fsq-developers"));
const places_utils_1 = require("./places.utils");
// const Place = require('./places.model');
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        fsq_developers_1.default.auth('fsq3U4PqPc3XCDECkQ5eqr/+TqV0rxbhDSpPI9vEFcvs0K0=');
        const data = yield fsq_developers_1.default.placeSearch({ query: 'Cocktail%20Bar', limit: 50, near: 'Los Angeles' });
        const places = data.data.results.map((result) => ({
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
        }));
        const created = yield (0, places_utils_1.createPlace)(places[0]);
        res.json(created);
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
