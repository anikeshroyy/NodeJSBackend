const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(`mongodb://localhost:27017/Vibely`)
        console.log("MongoDb connected Successfuly");
    } catch (error) {
        console.error(err.message);
    }
}


module.exports = connectDb;