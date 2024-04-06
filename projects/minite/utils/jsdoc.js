/**
 * @typedef {string} objectId - A string representation of MongoDB's ObjectID.
 */

/**
 * @typedef {object} User
 * @property {objectId} _id
 * @property {string} firebaseID
 * @property {string} email
 * @property {string} name
 */

/**
 * @typedef {object} Image
 * @property {objectId} _id
 * @property {string} url
 * @property {string} imageID
 * @property {string} year
 * @property {objectId} user
 * @property {objectId} event
 * @property {date} createdAt
 * @property {date} [deleted]
 * @property {'portrait' | 'landscape' | 'even'} portrait
 * @property {'main' | 'post' | 'crop' | 'original' | 'alt'} version
 */

/**
 * @typedef {object} Event
 * @property {objectId} _id
 * @property {string} name
 * @property {object} user
 * @property {string} year
 * @property {date} createdAt
 * @property {date} [deleted]
 * @property {array<Image>} images
 */



