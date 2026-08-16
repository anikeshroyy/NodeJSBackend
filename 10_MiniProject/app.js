require('dotenv').config()

const express = require('express')
const ejs = require('ejs')

const upload = require('./configs/MULTER_config')

const path = require('path')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const connectDb = require('./configs/DB_config')
const userModel = require('./models/user')
const postModel = require('./models/post')
const user = require('./models/user')
const post = require('./models/post')

const app = express()
const PORT = process.env.PORT || 3000;

// Database
connectDb();

// Middleware
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");

function isLoggedIn(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/login')
        }

        else {
            const currentUser = jwt.verify(token, process.env.JWT_SECRETS)
            req.user = currentUser;
            next();
        }
    } catch (err) {
        console.error(err.message)
        return res.redirect('/login');
    }
}

// Routes
app.get('/', async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.render("home", { user: null });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRETS);
        const user = await userModel.findById(decoded.id);

        res.render("home", { user });
    } catch (error) {
        res.render("home", { user: null });
    }
});

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/signup', async (req, res) => {
    try {

        let saltRound = 10;
        await bcrypt.genSalt(saltRound, async (err, salt) => {
            await bcrypt.hash(req.body.password, salt, async (err, hash) => {
                let newUser = await userModel.create({
                    name: req.body.fullName,
                    password: hash,
                    email: req.body.email,
                    username: req.body.username,
                })

                console.log("User is created");
                res.redirect("/login")
            })
        })
    } catch (error) {
        console.error(error.message);
    }
})

app.post('/login', async (req, res) => {
    try {
        let loggedInUser = await userModel.findOne({ email: req.body.email })
        if (!loggedInUser) {
            console.log("Email Not Found");
            return res.send("Either email or password is incorrect")
        }

        await bcrypt.compare(req.body.password, loggedInUser.password, (err, result) => {
            if (!result) {
                console.log("Password Not Matched");
                return res.send("Either email or password is incorrect")
            }

            let token = jwt.sign({ id: loggedInUser._id, email: loggedInUser.email }, process.env.JWT_SECRETS)
            res.cookie("token", token)
            res.redirect("/profile")
        })

    } catch (error) {
        console.error(error.message);
    }
})

app.get('/profile', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);
        const post = await postModel.find({ user: req.user.id })
        res.render("userProfile", { user, post })
    } catch (error) {
        console.error(error.message);
    }
})

app.get('/profile/edit', isLoggedIn, async (req, res) => {

    let editUser = await userModel.findById(req.user.id)

    res.render("editProfile", { user: editUser })
})

app.post('/profile/edit', isLoggedIn, async (req, res) => {
    try {
        let { name, email, profilePicture, bio } = req.body

        let updatedUser = await userModel.findOneAndUpdate({ _id: req.user.id }, {
            name,
            email,
            profilePicture,
            bio,
        })

        res.redirect('/profile')
    } catch (err) {
        console.error(err)
    }
})

app.get('/logout', async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
})

app.post('/uploadProfilePicure', isLoggedIn, upload.single("profilePicture"), async (req, res) => {
    try {
        console.log(req.file)
        const uploadedPicture = req.file

        await userModel.findOneAndUpdate({ _id: req.user.id }, {
            profilePicture: uploadedPicture.path
        })

        res.redirect('/profile/edit')
    } catch (err) {
        console.log(err);
    }
})

app.post('/create/post', isLoggedIn, async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        const newPost = await postModel.create({
            user: user._id,
            user_UserName: user.username,
            userProfilePicture: user.profilePicture,
            postContent: req.body.postContent,
            postImage: req.body.postImage,
        });

        res.redirect("/profile");

    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to create post");
    }
});

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})