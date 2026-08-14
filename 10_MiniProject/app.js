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
                    email: req.body.email
                })

                console.log("User is created");
                res.redirect("/")
            })
        })
    } catch (error) {
        console.error(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})