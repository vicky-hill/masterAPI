const Image = require('./image.model');
const Bookmark = require('../bookmarks/bookmarks.model');

/* ===================================
   Save Image
=================================== */
async function saveImage (req, res) {
    try {
        const uploadedImages = [];

        for (let i = 0; i < req.body.length; i++) {
            const uploaded = await Image.create({ url: req.body[i], user: req.user.id })
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
async function getImages (req, res) {
    try {
        const bookmark = await Bookmark.findById(req.params.id);
        
        let query = { user: req.user.id }

        if(!bookmark.primary) {
            query.bookmark = bookmark._id.toString();
        }
    
        const images = await Image.find(query);

        res.status(200).json(images);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'Something went wrong'});
    }
}

/* ===================================
   Update image
=================================== */
async function updateImage (req, res) {
    try {
        let image = await Image.findById(req.params.id);

        if(!image) {
            return res.status(404).json({ msg: 'Image not found' });
        }

        if(image.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'You are not authorized to update the image'})
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
async function deleteImages (req, res) {
    try {
        const deletedImages = [];

        for(let i = 0; i < req.body.length; i++) {
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


module.exports = {
    saveImage,
    getImages,
    updateImage,
    deleteImages
}