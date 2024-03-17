const express = require('express')
const router = express.Router()
const stepCtrl = require('./steps.controller')
const { protect } = require('../utils/middleware')

router.route('/:reqID').post(protect, stepCtrl.createStep)
router.route('/:stepID').delete(protect, stepCtrl.deleteStep)


module.exports = router; 