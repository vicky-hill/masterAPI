const express = require('express');
const router = express.Router();

const userCtrl = require('./users.controller');


/** @get /api/minite/user/all */
router.route('/all').get(userCtrl.getAllUsers)

/**
 * @route /api/minite/user
 * @get get current user
 * @post save a new user
 */
router
    .route('/')
    .get(userCtrl.getUser)
    .post(userCtrl.createUser)



module.exports = router; 