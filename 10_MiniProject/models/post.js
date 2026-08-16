const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    userProfilePicture: {
        type: String
    },

    user_UserName: {
        type: String,
        required: true
    },

    postImage: {
        type: String
    },

    postContent: {
        type: String,
        required: true
    },

    postTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("post", PostSchema);

// 9570575553