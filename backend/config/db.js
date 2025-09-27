import mongoose from 'mongoose';
const connectDB=async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected');
    } catch (error) {
        console.log('error in connecting mongodb');
        process.exit(1);
    }
}
export default connectDB;