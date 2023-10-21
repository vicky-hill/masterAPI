const Location = require('./locations.model');

/**
 * Get all locations
 * @returns [{ location }]
 */
async function getLocations(req, res) {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        console.log(err);
    }
}

/**
 * Get one location
 * @param id - ID of location to fetch
 * @returns location {}   
 */
async function getLocation(req, res) {
    try {
        const location = await Location.findById(req.params.id);

        if (!location) {
            return res.status(404).json({ msg: "Location not found" });
        }

        res.json(location);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/**
 * Create a location
 * @property {String} req.body.name 
 * @property {String} req.body.description 
 * @returns location {}   
 */
async function saveLocation(req, res) {
    try {
        const location = await Location.create(req.body);
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
        const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!location) {
            return res.status(404).json({ msg: "Location not found" });
        }

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

        if (!location) {
            return res.status(404).json({ msg: "Location not found" });
        }

        res.json(location)
    } catch (err) {
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

module.exports = {
    getLocations,
    getLocation,
    saveLocation,
    updateLocation,
    deleteLocation,
}