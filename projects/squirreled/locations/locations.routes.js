const express = require('express')
const router = express.Router()
const { protect, getLocation } = require('../middleware')

const locationCtrl = require('./locations.controller');

router.route('/dev').get(locationCtrl.dev);

/**
 * @get api/squirreled/locations - get all locations
 * @post api/squirreled/locations - create new location
 */
router
    .route('/')
    .get(protect, locationCtrl.getLocations)
    .post(protect, locationCtrl.createLocation)

/** 
* @post api/squirreled/locations/:locationID/storage - create a storage are
*/
router.route('/:locationID/storage').post(protect, locationCtrl.createStorageArea)



/**
 * @get api/squirreled/locations/:id - get location by id
 * @put api/squirreled/locations/:id - update location
 * @delete api/squirreled/locations/:id - delete location
 */
router
    .route('/:id')
    .get(protect, getLocation, locationCtrl.getLocation)
    .put(protect, getLocation, locationCtrl.updateLocation)
    .delete(protect, getLocation, locationCtrl.deleteLocation)




module.exports = router; 