const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/DataAssociation")

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },

    email: String,
    age: Number,
    post: []
})

module.exports = mongoose.model("user", userSchema);