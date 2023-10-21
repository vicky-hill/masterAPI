const express = require('express');
const router = express.Router();

const locationCtrl = require('./locations.controller');

/**
 * @get api/squirreled/locations - get all locations
 * @post api/squirreled/locations - create new location
 */
router
    .route('/')
    .get(locationCtrl.getLocations)
    .post(locationCtrl.saveLocation)

/**
 * @get api/squirreled/locations/:id - get location by id
 * @put api/squirreled/locations/:id - update location
 * @delete api/squirreled/locations/:id - delete location
 */
router
    .route('/:id')
    .get(locationCtrl.getLocation)
    .put(locationCtrl.updateLocation)
    .delete(locationCtrl.deleteLocation)




module.exports = router; 