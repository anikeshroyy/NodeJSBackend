const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')

const userModel = require('./model/userModel')
const { log } = require('console')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.set("view engine", "ejs")

const PORT = 3000

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/createAccount', (req, res) => {
    let { name, userName, password } = req.body

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let newUser = await userModel.create({
                name,
                userName,
                password: hash,
            })
            console.log("User Account Created:", newUser);
        })
    })
    res.redirect('/')
})

app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ userName: req.body.userName });
    if (!user) {
        console.log("User Not Found")
        return res.send("Something Went Wrong")
    }
    else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                res.send("You Can Login")
                console.log(result);
            }
            res.send("Something Went Wrong")
            console.log("Password Not Matched");
        })
    }
})

app.listen(PORT, () => {
    console.log("Server Started...")
})