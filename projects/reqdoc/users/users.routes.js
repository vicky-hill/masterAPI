const express = require('express')
const router = express.Router()

const userCtrl = require('./users.controller');

/** @get /api/reqdoc/user/all */
router.route('/all').get(userCtrl.getUsers)

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