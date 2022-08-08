require('dotenv').config();
const AWS = require('aws-sdk');
const uuid = require('uuid');


const getUrl = (userId) => {
    const keyPrefix = `${userId}`;
    const fileName = `${uuid.v4()}.jpg`;

    return `${keyPrefix}/${fileName}`;
}

/* ===================================
   Upload image
=================================== */
async function uploadImage(req, res) {
    try {

        let preSignedUrls = [];
        let keys = [];

        // Get signed url for web upload
        const s3 = new AWS.S3({
            accessKeyId: process.env.ACCESSKEYID,
            secretAccessKey: process.env.SECRETACCESSKEY
        })

        for (let i = 0; i < req.query.count; i++) {
            const key = getUrl(req.user.id);
            s3.getSignedUrl('putObject', {
                Bucket: 'minite-bucket',
                ContentType: 'image/jpeg',
                Key: key,
                Expires: 60
            }, (err, url) => {
                preSignedUrls.push(url);
                keys.push(key)
            })
        }

        // Put res on top of callback stack
        setTimeout(() => {
            res.status(200).json({ urls: preSignedUrls, keys: keys })
        }, 1)
        



    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Something didnt work right' });
    }
}

module.exports = {
    uploadImage
}