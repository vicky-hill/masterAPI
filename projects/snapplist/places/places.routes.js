const express = require('express');
const { test, getPhotos, createPlace } = require('./places.controller');
const router = express.Router()


router.route('/').get(test);
router.route('/').post(createPlace);
router.route('/:id/photos').get(getPhotos);


module.exports = router; 