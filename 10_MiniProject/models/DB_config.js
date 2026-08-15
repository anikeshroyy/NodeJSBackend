require('dotenv').config()

const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDb connected Successfuly");
    } catch (error) {
        console.error(err.message);
    }
}

module.exports = connectDb;