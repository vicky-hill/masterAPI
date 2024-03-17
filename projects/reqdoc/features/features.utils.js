const Feature = require('./features.model')
const throwError = require('../../../utils/throwError')

const checkFeatureAccess = async (featureID, userID) => {
    const feature = await Feature
        .findById(featureID)
        .populate({
            path: 'project',
            select: 'name',
            populate: {
                path: 'team', select: 'users'
            }
        })

    if (!feature) throwError('Feature not found');
    if (!feature.project.team.users.includes(userID)) throwError('User is not part of this team', { status: 401 });
}

module.exports = {
    checkFeatureAccess,
}