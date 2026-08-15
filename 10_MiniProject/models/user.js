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
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMJKVQstQO43_3IPzb35-L5aCQHt9OtjCGUWne7IjoxMLRQBbM-Mbi2Q&s=10"
    },

    bio: {
        type: String,
        maxlength: 160,
        default: ""
    },
})

module.exports = mongoose.model("user", userSchema)