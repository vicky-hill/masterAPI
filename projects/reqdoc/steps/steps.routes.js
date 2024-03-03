const express = require('express')
const router = express.Router()
const stepCtrl = require('./steps.controller')

router.route('/:reqID').post(stepCtrl.createStep)
router.route('/:stepID').delete(stepCtrl.deleteStep)


module.exports = router; 