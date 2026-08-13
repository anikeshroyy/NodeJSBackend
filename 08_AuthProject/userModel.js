const mongoose = require('mongoose')

const MongoConnetingString = `mongodb://localhost:27017/AuthPractice`
mongoose.connect(MongoConnetingString)

const userSchema = mongoose.Schema({
    name: String,
    userName: String,
    password: String,
})

module.exports = mongoose.model("user", userSchema)