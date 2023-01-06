const express = require('express');
const router = express.Router();

const userCtrl = require('./users.controller');

/**
 * @route /api/hotsauce/user
 * @post save a new user
 */
router
    .route('/')
    .post(userCtrl.saveUser)

module.exports = router; 