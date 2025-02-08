import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('Attempting to connect with URL:', process.env.MONGO_URL); 
    const conn = await mongoose.connect(process.env.MONGO_URL!);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error :any) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

export default connectDB;