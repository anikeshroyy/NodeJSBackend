const express = require('express')
const app = express()
const PORT = 3000

const userModel = require('./userModel')
const { model } = require('mongoose')

app.get('/', (req, res) => {
    res.end("Hello From Server")
})

app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        name: "Samay Raina",
        userName: "samay343",
        email: "rainasamay@gmail.com"
    })

    console.log(createdUser);
    res.send(createdUser)
})

app.get('/update', async (req, res) => {
    let updatedUser = await userModel.findOneAndUpdate({ userName: "aniraj343" }, { name: "Ani Raj" }, { new: true })

    console.log(updatedUser);
    res.send(updatedUser)
})

app.get('/read', async (req, res) => {
    let allUser = await userModel.find()

    console.log(allUser);
    res.send(allUser)
})

app.get('/delete', async (req, res) => {
    let deletedUser = await userModel.findOneAndDelete({ userName: "aniraj343" })

    console.log(deletedUser);
    res.send(deletedUser)
})

app.listen(PORT, () => {
    console.log("Server is Running on", `localhost:${PORT}`);
})