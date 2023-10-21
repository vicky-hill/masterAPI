const express = require('express')
const router = express.Router()
const eventCtrl = require('./event.controller')
const { protect } = require('../../../middleware/auth')

router
    .route('/')
    .get(protect, eventCtrl.getAllUserEvents)
    .post(protect, eventCtrl.createEvent)

router
    .route('/:id')
    .get(protect, eventCtrl.getEventByID)

module.exports = router;