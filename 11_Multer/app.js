const express = require('express')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto');

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "publica")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
        const fileName = crypto.randomBytes(12, (err, bytes) => {
            if (err) return cb(err)
            const fn = bytes.toString("hex") + path.basename(file.originalname)
            cb(null, fn)
        })
    }
})

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true)
    }
    else {
        cb(new Error('Only images are allowed'))
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

app.get('/', (req, res) => {
    res.render("uploadFile")
})

app.post('/upload', upload.single("image"), (req, res) => {
    res.send(req.file);

})

app.listen(PORT)