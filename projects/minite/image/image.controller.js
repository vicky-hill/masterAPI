const Image = require('./image.model')
const Bookmark = require('../bookmarks/bookmarks.model')
const ImageKit = require('imagekit')
const validate = require('../utils/validation')
const { checkEventAccess } = require('../utils/access')

require('dotenv').config();

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});

/**
 * Create image
 * @property {array} [{ url, name, event }]
 * @property {string} req.body.url - imagekit url for image
 * @property {string} req.body.file - file name of image
 * @property {string} req.body.name - 2024_paris_main
 * @property {string} req.body.event - object Id of event
 * @property {string} req.body.imageID - image id 
 */
const createImage = async (req, res, next) => {
    try {
        const { user } = req.user;

        await checkEventAccess(req.body[0].event, user);
        
        const uploadedImages = [];

        for (let i = 0; i < req.body.length; i++) {
            const body = { ...req.body[i], user }

            await validate.createImage(body);

            const uploaded = await Image.create(body);
            uploadedImages.push(uploaded);
        }

        // Put res on top of callback stack
        setTimeout(() => {
            res.status(200).json(uploadedImages);
        }, 1)

    } catch (err) {
        err.errorCode = 'images_001';
        next(err);
    }
}

/**
 * Get all images

 */
const getImages = async (req, res, next) => {
    try {
        // const bookmark = await Bookmark.findById(req.params.id);

        // let query = { user: req.user.id }

        // if(!bookmark.primary) {
        //     query.bookmark = bookmark._id.toString();
        // }

        const { user } = req.user;

        const images = await Image.find({ user })
            .populate("event");

        res.status(200).json(images);
    } catch (err) {
        err.errorCode = 'images_002';
        next(err);
    }
}

/**
 * Update image
 * @param imageID
 */
const getImagesByImageID = async (req, res, next) => {
    try {
        const { imageID } = req.params;
        const { user } = req.user;

        const images = await Image.find({ imageID, user });

        res.json(images);
    } catch (err) {
        err.errorCode = 'images_003';
        next(err);
    }
}

/**
 * Update image
 * @param imageID
 * @property req.body.url
 * @property req.body.name
 * @property req.body.version
 */
const updateImage = async (req, res, next) => {
    try {
        const { imageID } = req.params;
        
        let image = await Image.findById(imageID);

        image = await Image.findByIdAndUpdate(imageID, req.body, { new: true });

        res.status(200).json(image);
    } catch (err) {
        err.errorCode = 'images_004';
        next(err);
    }
}

/**
 * Delete images
 * @property {array} req.body [objectID]
 */
const deleteImages = async (req, res, next) => {
    try {
        const deletedImages = [];

        for (let i = 0; i < req.body.length; i++) {
            const deletedImage = await Image.findByIdAndDelete(req.body[i]);
            deletedImages.push(deletedImage._id);
        }

        setTimeout(() => {
            res.status(200).json(deletedImages)
        }, 1)

    } catch (err) {
        err.errorCode = 'images_005';
        next(err);
    }
}

const imageKitAuth = async (req, res, next) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (err) {
        err.errorCode = 'images_006';
        next(err);
    }
}

/**
 * Get next image id for event's year
 * @param year
 * @returns {string} imageID
 */
const getNextImageID = async (req, res, next) => {
    try {
        const { year } = req.params;
        const { user } = req.user;
        let nextImageID;

        const latestImage = await Image.findOne({ user, year }).sort({imageID: -1});

        if (latestImage) {
            let imagePrefix = latestImage.imageID.slice(0, 3);
            let imageDigits = Number(latestImage.imageID.slice(3)) + 1;
    
            nextImageID = imagePrefix + imageDigits.toString().padStart(4, 0);
      
        } else {
            let imagePrefix = `i${year.slice(2)}`;
            let imageDigits = '0001';

            nextImageID = imagePrefix + imageDigits;
        }

        res.json(nextImageID);
    } catch (err) {
        err.errorCode = 'images_007';
        console.log(err);
    }
}



module.exports = {
    createImage,
    getImages,
    updateImage,
    deleteImages,
    imageKitAuth,
    getImagesByImageID,
    getNextImageID
}