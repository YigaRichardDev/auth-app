import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async ()=> {
    try{
        const mongoURI: string = process.env.MONGODB_URI || '';
        await mongoose.connect(mongoURI);
        console.log("MongoBD connected successfully!");
    }catch(error){
        console.error("MongoDB failed to connect!", error);
        process.exit(1);
    }
    
};

export default connectDB;