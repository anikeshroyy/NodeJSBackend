const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/multerTest`)

const userSchema = new mongoose.Schema({
    name: String,
    profilePic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMJKVQstQO43_3IPzb35-L5aCQHt9OtjCGUWne7IjoxMLRQBbM-Mbi2Q&s=10"
    }
})

module.exports = mongoose.model("user", userSchema)