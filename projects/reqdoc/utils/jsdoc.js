/**
 * @typedef {string} objectId - A string representation of MongoDB's ObjectID.
 */

/**
 * @typedef {object} Project
 * @property {objectId} _id
 * @property {string} name
 * @property {string} key
 * @property {array<Feature>} [features]
 */

/**
 * @typedef {object} Feature
 * @property {objectId} _id
 * @property {objectId} project
 * @property {string} name
 * @property {string} key
 * @property {number} sort 
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
 * @property {string} [title]
 * @property {string} [changed_req]
 * @property {array<Req>} [history]
 */



