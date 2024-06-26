const express = require('express')
const router = express.Router()
const eventCtrl = require('./event.controller')
const { protect } = require('../utils/middleware');

router
    .route('/')
    .get(protect, eventCtrl.getAllUserEvents)
    .post(protect, eventCtrl.createEvent)

router
    .route('/:eventID')
    .get(protect, eventCtrl.getEventByID)

module.exports = router;