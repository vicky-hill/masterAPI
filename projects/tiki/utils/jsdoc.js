/**
 * @typedef {string} objectId - A string representation of MongoDB's ObjectID.
 */

/**
 * @typedef {object} Cart
 * @property {objectId} _id
 * @property {'open'| 'closed'} status
 * @property {date} createdAt
 * @property {array<Item>} items
 */

/**
 * @typedef {object} Item
 * @property {objectId} _id
 * @property {number} quantity
 */

/**
 * @typedef {object} Category
 * @property {objectId} _id
 * @property {string} name
 * @property {"active" || "inactive"} status
 */


