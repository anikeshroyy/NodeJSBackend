require('dotenv').config()

const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/vibely`)
        console.log("MongoDb connected Successfuly");
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectDb;