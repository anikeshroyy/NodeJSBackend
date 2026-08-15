const express = require('express')
const ejs = require('ejs')

const path = require('path')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const connectDb = require('./models/DB_config')
const userModel = require('./models/user')

const app = express()
const PORT = 3000;

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

// Routes
app.get('/', (req, res) => {
    res.render("home")
})

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

            let token = jwt.sign({ id: loggedInUser._id, email: loggedInUser.email }, "secrets")
            res.cookie("token", token)
            console.log(result);
            // res.send("You are logged in")
            res.redirect("/profile")
        })

    } catch (error) {
        console.error(error.message);
    }
})

app.get('/profile', async (req, res) => {
    try {
        const token = await req.cookies.token;

        if (!token) {
            console.log("Token Not Present")
            return res.redirect('/login')
        }

        const validUser = jwt.verify(token, "secrets")

        const user = await userModel.findOne({ _id: validUser.id })

        res.render("userProfile", { user })

    } catch (error) {
        console.error(error.message);
    }
})

app.get('/profile/edit', async (req, res) => {

    let token = await req.cookies.token;

    let user = await jwt.verify(token, "secrets")

    let editUser = await userModel.findOne({ _id: user.id })

    res.render("editProfile", { user: editUser })
})

app.post('/profile/edit', async (req, res) => {
    try {

        let { name, email, profilePicture, bio } = req.body

        let token = await req.cookies.token;
        let user = await jwt.verify(token, "secrets")

        let updatedUser = await userModel.findOneAndUpdate({ _id: user.id }, {
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

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})