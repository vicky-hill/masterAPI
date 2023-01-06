const express = require('express');
const router = express.Router();
const { protect } = require('../../../middleware/decodeToken');

const userCtrl = require('./users.controller');

/**
 * @route /api/hotsauce/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(protect, userCtrl.getUser)
    .post(userCtrl.saveUser)

module.exports = router; 