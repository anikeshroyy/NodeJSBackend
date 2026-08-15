const express = require('express')
const path = require('path')
const multer = require('multer')
const crypto = require('crypto');

const userModel = require('./models/user')

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

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

app.get('/', async (req, res) => {
    let user = await userModel.findOne({ name: "ramu" })

    res.render("uploadFile", { user: user })
})

app.post('/create', async (req, res) => {
    let user = await userModel.create({
        name: req.body.name,
    })

    res.render('uploadFile', { user: user })

})

app.post('/upload', upload.single("image"), async (req, res) => {

    const user = await userModel.findOne({ name: "ramu" });

    user.profilePic = `/images/uploads/${req.file.filename}`;

    await user.save();

    res.redirect('/');
});

app.listen(PORT, () => {
    console.log("Server Started");
})