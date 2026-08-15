const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },

    username: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    profilePicture: {
        type: String,
        default: ""
    },

    bio: {
        type: String,
        maxlength: 160,
        default: ""
    },
})

module.exports = mongoose.model("user", userSchema)