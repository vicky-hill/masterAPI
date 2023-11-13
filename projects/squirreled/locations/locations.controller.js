const Location = require('./locations.model');
const Item = require('../items/items.model')

async function dev(req, res) {
    try {
        const locations = await Location.updateMany({}, { type: 'main' }, { new: true });
        res.json(locations);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get user locations
 * @returns [{ location }]
 */
async function getLocations(req, res) {
    try {
        const locations = await Location
            .find({ user: req.user._id, type: 'main' })
            .populate([{
                path: 'storage_areas',
                model: Location,
                populate: {
                    path: 'storage_areas',
                    model: Location,
                    populate: {
                        path: 'items',
                        model: Item,
                        match: { trash: false }
                    }
                }
            }]);

        res.json(locations);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get location by ID
 * @param id - ID of location to fetch
 * @returns location {}   
 */
async function getLocation(req, res) {
    try {
        res.json(req.location);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a location
 * @header x-auth-token
 * @property {String} req.body.name 
 * @returns location {}   
 */
async function createLocation(req, res) {
    try {
        const location = await Location.create({
            ...req.body,
            path: req.body.name,
            user: req.user._id
        });

        res.json(location);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a storage area
 * @header x-auth-token
 * @param locationID
 * @property {String} req.body.name 
 * @returns location {}   
 */
async function createStorageArea(req, res) {
    try {
        const { locationID } = req.params;

        const location = await Location.findById(locationID);

        const storageArea = await Location.create({
            ...req.body,
            type: 'storage',
            path: `${location.path} :: ${req.body.name}`,
            user: req.user._id
        });

        const updatedParentLocation = await Location
            .findByIdAndUpdate(locationID, { $push: { storage_areas: storageArea._id } }, { new: true })
            .populate('storage_areas');

        res.json(updatedParentLocation);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Update location
 * @param id
 * @property {String} req.body.name 
 * @property {String} req.body.description 
 * @returns location {}   
 */
async function updateLocation(req, res) {
    try {
        const location = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(location);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Delete location
 * @param id
 * @returns location {}   
 */
async function deleteLocation(req, res) {
    try {
        const location = await Location.findByIdAndDelete(req.params.id);
        res.json(location)
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = {
    dev,
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation,
    createStorageArea
}