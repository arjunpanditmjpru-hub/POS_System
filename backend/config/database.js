const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // const conn = await mongoose.connect(config.databaseURI);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection Successful...")
    } 
    catch (error) {
        console.log("Connection failed")
    }
}

module.exports = connectDB;
