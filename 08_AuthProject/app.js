const express = require('express')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const path = require('path')
const bcrypt = require('bcrypt')

const userModel = require('./model/userModel')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())

app.set("view engine", "ejs")

const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render("home")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.post('/createAccount', async (req, res) => {
    try {
        let { name, userName, password } = req.body

        await bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(password, salt, async (err, hash) => {
                let newUser = await userModel.create({
                    name,
                    userName,
                    password: hash,
                })

                console.log("User Account Created:", newUser);
            })
        })
        res.redirect('login')
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong")
    }
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
                const token = jwt.sign(
                    { userName: user.userName },
                    "secrets"
                )
                res.cookie("token", token)
                console.log(result);
                return res.send("You Can Login")
            }
            console.log("Password Not Matched");
            return res.send("Something Went Wrong")
        })
    }
})

app.listen(PORT, () => {
    console.log("Server Started...")
})