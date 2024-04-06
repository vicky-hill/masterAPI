const Event = require('../events/event.model')
const throwError = require('../../../utils/throwError')

const checkEventAccess = async (eventID, userID) => {
    const event = await Event.findById(eventID)
  
    if (!event) throwError('Feature not found');
    if (event.deleted) throwError('Feature was deleted');
    if (event.user.toString() !== userID) throwError('User is not authorized to view this event')
}

module.exports = {
    checkEventAccess
}