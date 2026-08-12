const express = require('express')

const path = require('path')

const userModel = require('./UserModel');
const { log } = require('console');

const app = express()
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "/public")))
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
    let allUser = await userModel.find()
    console.log(allUser)
    res.render("index", { allUser: allUser })
})

app.post('/create', async (req, res) => {
    let user = await userModel.create({
        name: req.body.name,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
    })

    res.redirect('/')
    console.log(user);
})

app.get('/delete/:id', async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({
        _id: req.params.id
    })

    console.log("Deleted User:", deletedUser)
    res.redirect('/')
})

app.listen(PORT, () => {
    console.log("Server is Running...");
})