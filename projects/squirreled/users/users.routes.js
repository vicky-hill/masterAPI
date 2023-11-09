const express = require('express');
const router = express.Router();
const { protect } = require('../protect');

const userCtrl = require('./users.controller');

/**
 * @route /api/squirreled/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(protect, userCtrl.getUser)
    .post(userCtrl.createUser)

module.exports = router; 