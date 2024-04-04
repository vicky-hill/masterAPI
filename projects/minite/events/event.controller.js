const Event = require('./event.model')
const validate = require('../utils/validation')

/**
 * Create event
 * @property {string} req.body.name 
 */
const createEvent = async (req, res) => {
    try {
        const { name } = req.body;
        const { userID } = req.user;
       
        const body = { name, user: userID }
        await validate.createEvent(body);
        
        const event = await Event.create(body);

        res.status(201).json(event);
    } catch (err) {
        res.status(500)
    }
}

/**
 * Get all events for user
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
const getAllUserEvents = async (req, res) => {
    try {
        const { userID } = req.user;

        const events = await Event.find({ user: userID })
            // .populate('images');

        res.status(200).json(events);
    } catch (err) {
        res.status(500);
        console.log(err)
    }
}

/**
 * Get event with images
 * @query eventID
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
const getEventByID = async (req, res) => {
    try {
        const { eventID } = req.params;

        const event = await Event.findById(eventID)
        // .populate('images');
         
        res.status(200).json(event);
    } catch (err) {
        res.status(500);
        console.log(err)
    }
}

module.exports = {
    createEvent,
    getAllUserEvents,
    getEventByID
}