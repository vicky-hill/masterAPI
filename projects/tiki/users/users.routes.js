const express = require('express');
const router = express.Router();
const { protect } = require('../middleware');

const userCtrl = require('./users.controller');

/**
 * @route /api/tiki/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(userCtrl.getUser)
    .post(userCtrl.createUser)

module.exports = router; 