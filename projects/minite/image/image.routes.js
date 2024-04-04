const express = require('express');
const router = express.Router();
const { protect } = require('../utils/middleware');

const imageCtrl = require('./image.controller');


router
    .route('/')
    .get(protect, imageCtrl.getImages)
    .post(protect, imageCtrl.createImage)
    .delete(protect, imageCtrl.deleteImages)

router
    .route('/imagekit')
    .get(imageCtrl.imageKitAuth)

router
    .route('/:imageID')
    .put(protect, imageCtrl.updateImage)


module.exports = router; 
