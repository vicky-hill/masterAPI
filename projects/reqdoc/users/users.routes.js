const express = require('express')
const router = express.Router()
const { protect } = require('../../../middleware/auth')

const userCtrl = require('./users.controller');

/** @get /api/reqdoc/user/all */
router.route('/all').get(userCtrl.getAllUsers)

/**
 * @route /api/squirreled/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(userCtrl.getUser)
    .post(userCtrl.createUser)

module.exports = router; 