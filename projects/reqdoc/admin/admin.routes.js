const express = require('express')
const router = express.Router()
const { protect } = require('../utils/middleware')
const adminCtrl = require('./admin.controller')

router.route('/delete-all').delete(protect, adminCtrl.deleteFlagged);


module.exports = router; 