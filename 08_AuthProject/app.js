const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')

const userModel = require('./userModel')
const { log } = require('console')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.set("view engine", "ejs")

const PORT = 3000

app.get('/', (req, res) => {
    res.render("index")
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
        })
    })

    res.redirect('/')
    console.log("User Account Created");
})

app.listen(PORT, () => {
    console.log("Server Started...")
})