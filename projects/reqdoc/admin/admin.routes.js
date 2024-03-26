const express = require('express')
const router = express.Router()
const { protect } = require('../utils/middleware')
const adminCtrl = require('./admin.controller')

router.route('/delete-all').delete(protect, adminCtrl.deleteFlagged);

router.route('/steps').get(protect, adminCtrl.getAllSteps)


module.exports = router; 