import mongoose from "mongoose";

const connectDB  = async () =>{
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB connected");
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        process.exit(1); // Stop the app if DB fails
    }
}

export default connectDB;