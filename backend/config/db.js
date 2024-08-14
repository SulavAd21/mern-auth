import mongoose from "mongoose";

const dbConnect = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_CLIENT);

        connection && console.log("MongoDB connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

export default dbConnect;