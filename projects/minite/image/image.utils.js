const Image = require('./image.model');

const getNewImageID = async (user) => {
    const year = new Date().getFullYear().toString();
    const latestImage = await Image.findOne({ user }).sort({createdAt: -1});
    let imagePrefix = `i${year.slice(2)}`;
    let imageDigits = Number(latestImage.imageID.slice(3)) + 1;

    if (year !==  new Date(latestImage.createdAt).getFullYear().toString()) {
        imagePrefix = `i${Number(year.slice(2)) + 1}`;
        imageDigits = 1;
    }

    const newImageID = imagePrefix + imageDigits.toString().padStart(4, 0);
    
    return newImageID;
}

module.exports = {
    getNewImageID
}