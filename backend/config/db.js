// db.js: Manages the database connection using Mongoose
import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect to MongoDB using the URI from .env
        console.log("MongoDB CONNECTED SUCCESSFULLY")
    } catch (error) {// Log error and exit if connection fails
        console.log("Error connecting to MONGODB", error);
        process.exit(1); // Exit with failure
    };
}


// Note: process.env.MONGO_URI keeps the connection string secure and configurable