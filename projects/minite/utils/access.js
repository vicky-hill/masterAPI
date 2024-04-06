const Event = require('../events/event.model')
const throwError = require('../../../utils/throwError')

const checkEventAccess = async (eventID, userID) => {
    const event = await Event.findById(eventID)
  
    if (!event) throwError('Event not found');
    if (event.deleted) throwError('Event was deleted');
    if (event.user.toString() !== userID.toString()) throwError('User is not authorized to view this event')
}

module.exports = {
    checkEventAccess
}