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
 * @typedef {object} Image
 * @property {objectId} _id
 * @property {string} url
 * @property {number} sort
 */

/**
 * @typedef {object} Category
 * @property {objectId} _id
 * @property {string} name
 * @property {"active" || "inactive"} status
 */

/**
 * @typedef {object} Product
 * @property {objectId} _id
 * @property {string} name
 * @property {string} shortDesc
 * @property {string} description
 * @property {string} image
 * @property {number} price
 * @property {number} quantity
 * @property {object} category
 * @property {array<Image>} images
 * @property {property} category._id
 * @property {property} category.name
 * @property {date} createdAt
 * @property {date} updatedAt
 */



