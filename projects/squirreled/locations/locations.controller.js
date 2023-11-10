const Location = require('./locations.model');

/**
 * Get user locations
 * @returns [{ location }]
 */
async function getLocations(req, res) {
    try {
        const locations = await Location
            .find({ user: req.user._id })
            .populate('user');

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
 * @property {String} req.body.description 
 * @returns location {}   
 */
async function createLocation(req, res) {
    try {
        const location = await Location.create({
            ...req.body,
            user: req.user._id
        });

        res.json(location);
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
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation
}