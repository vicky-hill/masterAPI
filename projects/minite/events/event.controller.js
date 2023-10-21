const Event = require('./event.model')


/**
 * Create event
 * @header x-auth-token
 * @property req.body.name - name of the event
 */
async function createEvent(req, res) {
    try {
        const event = await Event.create({ ...req.body, user: req.user.id });

        res.status(201).json(event);
    } catch (err) {
        res.status(500)
    }
}

/**
 * Get all events for user
 * @header x-auth-token
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
async function getAllUserEvents(req, res) {
    try {
        const events = await Event.find({ user: req.user.id })
            .populate('images');

        res.status(200).json(events);
    } catch (err) {
        res.status(500);
        console.log(err)
    }
}

/**
 * Get event with images
 * @header x-auth-token
 * @param eventID
 * @returns [{ _id, name, user, year, createdAt, updatedAt }]
 */
async function getEventByID(req, res) {
    try {
        const event = await Event.findById("64fe366b7c6fc458c573dd6f").populate('images');
         
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