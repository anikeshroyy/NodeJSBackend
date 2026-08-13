require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

const userSchema = mongoose.Schema({
    name: String,
    userName: String,
    password: String,
})

module.exports = mongoose.model("user", userSchema)