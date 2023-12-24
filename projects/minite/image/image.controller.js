const Image = require('./image.model');
const Bookmark = require('../bookmarks/bookmarks.model');
const utils = require('./image.utils');
const ImageKit = require('imagekit');
require('dotenv').config();


const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
});


/**
 * Create image
 * @header x-auth-token
 * @property req.body.name - name of the event
 */
const createImage = async (req, res) => {
    try {
        const uploadedImages = [];

        for (let i = 0; i < req.body.length; i++) {
            const imageID = await utils.getNewImageID();

            const uploaded = await Image.create({
                ...req.body[i],
                user: req.user.id,
                imageID
            })
            uploadedImages.push(uploaded);
        }

        // Put res on top of callback stack
        setTimeout(() => {
            res.status(200).json(uploadedImages);
        }, 1)

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something didnt work right' });
    }
}

/* ===================================
   Get all images
=================================== */
const getImages = async (req, res) => {
    try {
        // const bookmark = await Bookmark.findById(req.params.id);

        // let query = { user: req.user.id }

        // if(!bookmark.primary) {
        //     query.bookmark = bookmark._id.toString();
        // }

        const images = await Image.find({ user: req.user.id })
            // .populate("event");

        res.status(200).json(images);
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something went wrong' });
    }
}

/* ===================================
   Update image
=================================== */
const updateImage = async (req, res) => {
    try {
        let image = await Image.findById(req.params.id);

        if (!image) {
            return res.status(404).json({ msg: 'Image not found' });
        }

        if (image.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'You are not authorized to update the image' })
        }

        image = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json(image);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}

/* ===================================
   Delete images
=================================== */
const deleteImages = async (req, res) => {
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
        console.log(err);
        res.status(500)
    }
}

const imageKitAuth = async (req, res) => {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.send(result);
    } catch (err) {
        console.log(err);
        res.status(500)
    }
}


module.exports = {
    createImage,
    getImages,
    updateImage,
    deleteImages,
    imageKitAuth
}