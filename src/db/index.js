import mongoose from "mongoose";

const connectDB = async () => {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_COLLECTION_NAME || ""}`);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection;
}

export default connectDB;