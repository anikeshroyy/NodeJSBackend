const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/UserDBPractice`)

const UserSchema = mongoose.Schema({
    name: String,
    userName: String,
    userEmail: String,
})

module.exports = mongoose.model("user", UserSchema)