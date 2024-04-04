const Event = require('./event.model')
const validate = require('../utils/validation')

/**
 * Create event
 * @property {string} req.body.name 
 */
const createEvent = async (req, res, next) => {
    try {
        const { name } = req.body;
        const { user } = req.user;

        const body = { name, user }
        await validate.createEvent(body);

        const event = await Event.create(body);

        res.status(201).json(event);
    } catch (err) {
        err.errorCode = 'events_001';
        next(err);
    }
}

/**
 * Get all events for user
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
const getAllUserEvents = async (req, res, next) => {
    try {
        const { user } = req.user;

        const events = await Event.find({ user })
        // .populate('images');

        res.status(200).json(events);
    } catch (err) {
        err.errorCode = 'events_002';
        next(err);
    }
}

/**
 * Get event with images
 * @query eventID
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
const getEventByID = async (req, res, next) => {
    try {
        const { eventID } = req.params;

        const event = await Event.findById(eventID)
            .populate('images');

        res.status(200).json(event);
    } catch (err) {
        err.errorCode = 'events_003';
        next(err);
    }
}

module.exports = {
    createEvent,
    getAllUserEvents,
    getEventByID
}