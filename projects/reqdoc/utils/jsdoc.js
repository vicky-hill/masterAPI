/**
 * @typedef {string} objectId - A string representation of MongoDB's ObjectID.
 */

/**
 * @typedef {object} User
 * @property {objectId} _id
 * @property {string} firebaseID
 * @property {string} email
 * @property {string} name
 * @property {string} [deleted]
 * @property {array<Team />} teams
 */

/**
 * @typedef {object} Team
 * @property {objectId} _id
 * @property {string} name
 * @property {string} [deleted]
 * @property {array<User />} users
 * @property {array<Project />} project
 */

/**
 * @typedef {object} Project
 * @property {objectId} _id
 * @property {string} name
 * @property {string} key
 * @property {objectId} team
 * @property {string} [deleted]
 * @property {objectId} first_feature
 * @property {array<Feature>} [features]
 */

/**
 * @typedef {object} Feature
 * @property {objectId} _id
 * @property {objectId} project
 * @property {string} name
 * @property {string} key
 * @property {number} sort 
 * @property {string} [deleted]
 * @property {objectId} [main_feature]
 * @property {array<Feature>} sub_features
 * @property {array<Req>} reqs
 */

/**
 * @typedef {object} Req
 * @property {objectId} _id
 * @property {objectId} project
 * @property {objectId} feature
 * @property {string} key
 * @property {string} text
 * @property {'passed' | 'failed' | null } state
 * @property {number} sort
 * @property {date} createdAt
 * @property {date} updatedAt
 * @property {string} [deleted]
 * @property {string} [title]
 * @property {string} [changed_req]
 * @property {array<Req>} [history]
 * @property {array<Step>} [steps]
 */

/**
 * @typedef {object} Step
 * @property {objectId} _id
 * @property {objectId} req
 * @property {string} text
 * @property {string} [deleted]
 * @property {number} sort
 */

