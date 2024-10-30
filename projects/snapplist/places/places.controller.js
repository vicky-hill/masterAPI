const fsqDevelopers = require('@api/fsq-developers');
const Place = require('./places.model');

const test = async (req, res, next) => {
    try {
        fsqDevelopers.auth('fsq3U4PqPc3XCDECkQ5eqr/+TqV0rxbhDSpPI9vEFcvs0K0=');
        const data = await fsqDevelopers.placeSearch({ query: 'Cocktail%20Bar', limit: 50, near: 'Los Angeles' })

        res.json({
            data: data.data.results.map(result => ({
                // categories: result.categories.map(category => category.name),
                fsq_id: result.fsq_id,
                name: result.name,
                result
            }))
        })

        // res.json(data)
    } catch (err) {
        err.ctrl = test;
        next(err);
    }
}

const getPhotos = async (req, res, next) => {
    try {
        fsqDevelopers.auth('fsq3nik7c+GzEF6ruflZ3nFzKGT48Kk09IlyVAUGMDG2Twk=');
        const data = await fsqDevelopers.placePhotos({ fsq_id: req.params.id })
        
        res.json(data)
    } catch (err) {
        err.ctrl = getPhotos;
        next(err);
    }
}

const createPlace = async (req, res, next) => {
    try {
        const body = {
            fsq_id: req.body.fsq_id,
            name: req.body.name,
            geo: {
                lat: req.body.geocodes.main.latitude,
                long:  req.body.geocodes.main.longitude,
            },
            location: {
                address: req.body.location.address,
                country: req.body.location.country,
                locality: req.body.location.locality,
                postcode: req.body.location.postcode,
                region: req.body.location.region
            },
            address: req.body.location.formatted_address
        }

        const place = await Place.create(body);
        
        res.json(place);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    test,
    getPhotos,
    createPlace
}