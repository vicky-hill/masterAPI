const Image = require('./image.model');

const getNewImageID = async (user) => {
    const year = new Date().getFullYear().toString();
    const latestImage = await Image.findOne({ user }).sort({imageID: -1});
    
    let imagePrefix = `i${year.slice(2)}`;
    let imageDigits = latestImage ? Number(latestImage.imageID.slice(3)) + 1 : 1;
    let latestImageYear = latestImage && new Date(latestImage?.createdAt).getFullYear().toString();
   
    if (latestImage && year !== latestImageYear) {
        imagePrefix = `i${Number(year.slice(2)) + 1}`;
        imageDigits = 1;
    }

    const newImageID = imagePrefix + imageDigits.toString().padStart(4, 0);
    
    return newImageID;
}

module.exports = {
    getNewImageID
}