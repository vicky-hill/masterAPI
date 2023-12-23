const Location = require('./locations.model')
const Item = require('../items/items.model')

async function dev(req, res) {
    // try {
    //     const locations = await Location.updateMany({}, { type: 'sub' }, { new: true });
    //     res.json(locations);
    // } catch (err) {
    //     console.log(err);
    // }
}

/**
 * Get user locations
 * @return {array<Location>}
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
                    model: Location
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
 * @returns {Location}
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
 * Get location storage areas and items
 * @query {string} areas 
 * @returns {object} { storageAreas1: [], storageAreas2: [], items: []}
 */
async function getLocationItems(req, res) {
    try {
        const { locationID } = req.params;
        const areas = req.query.areas.split(',');

        if (!areas[0]) return sendError(next, 404, {
            error: `No storage areas were provided in the areas query`
        });

        if (!locationID) return sendError(next, 404, {
            error: `No locationID was provided in the params`
        });

        const storageAreas1 = await Location.findById(locationID)
            .populate({ path: 'storage_areas', select: '-storage_areas' });

        const storageAreas2 = await Location.findById(areas[0])
            .populate({ path: 'storage_areas', select: '-storage_areas' });

        const items = await Item.find({ location: areas.length === 1 ? areas[0] : areas[1] }).populate('location');

        res.json({ storageAreas1: storageAreas1.storage_areas, storageAreas2: storageAreas2.storage_areas, items });
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
        const { location } = req;

        if (req.body.name) {
            const updatedPath = location.path.replace(location.name, req.body.name);
            req.body.path = updatedPath;
        }

        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLocation);
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
    createStorageArea,
    getLocationItems
}