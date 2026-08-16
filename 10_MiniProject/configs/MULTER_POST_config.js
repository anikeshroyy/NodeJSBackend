require('dotenv').config()

const multer = require('multer')
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRETS,
})


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: (req, file) => 'vibely-posts',

        public_id: (req, file) => {
            const name = file.originalname
                .split(".")[0]
                .replace(/\s+/g, "-");

            return `${name}-${Date.now()}`;
        },
    },
});


function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    }
    else {
        cb(new Error('Only images are allowed'))
    }
}

const uploadPostImage = multer({ storage: storage, fileFilter: fileFilter })


module.exports = uploadPostImage;